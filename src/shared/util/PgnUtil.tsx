import { TChessPgnHeaders } from '../types/chess/TChessPgnHeaders';
import { clampNumber } from './NumberUtil';
import { TChessPgn } from '@/shared/types/chess/TChessPgn';
import { TChessPgnMove } from '@/shared/types/chess/TChessPgnMove';

function throwIfProcessingSAN(moveText: string, moveTextIndex: number, processingSAN: string) {
    if (processingSAN) {
        const peekWindow = 30;
        const startPeekIndex = clampNumber(moveTextIndex - peekWindow, 0, moveText.length);
        const endPeekIndex = clampNumber(moveTextIndex + peekWindow, 0, moveText.length);
        const caretIndex = clampNumber(peekWindow, 0, moveTextIndex);

        throw new Error(`
        Failed parsing PGN, string incorrect at index ${moveTextIndex}:
        "${moveText.slice(startPeekIndex, endPeekIndex)}"
         ${' '.repeat(caretIndex)}^
      `);
    }
}

/**
 * Parses a ply from a move text string
 *
 * @param moveText - The move text string to parse
 * @param moveTextIndex - The index of the move text string
 * @param processingSAN - Whether the move text string is processing a SAN move
 * @returns The parsed ply and the length of the ply string
 */
function parseMovePly(fullMoveText: string, moveTextIndex: number) {
    const moveText = fullMoveText.slice(moveTextIndex);

    let ply = 0;
    let plyLength = 0;

    const match = /(?<moveNumber>\d+)\.+/d.exec(moveText);
    if (match) {
        const { groups = {}, indices = [[], []] } = match;
        const { moveNumber } = groups;
        const [[, end = 0]] = indices;
        ply = +moveNumber;
        plyLength = end - 1;
    }
    return { ply, plyLength };
}

/**
 * Parses a nag from a move text string
 *
 * @param moveText - The move text string to parse
 * @param moveTextIndex - The index of the move text string
 * @param processingSAN - Whether the move text string is processing a SAN move
 * @returns The parsed nag and the length of the nag string
 */
function parseNextNag(fullMoveText: string, moveTextIndex: number) {
    const moveText = fullMoveText.slice(moveTextIndex);

    let moveNag = 0;
    let positionNag = 0;
    let timeNag = 0;
    let nagLength = 0;

    const match = /\$(?<nag>\d+)/d.exec(moveText);
    if (match) {
        const { groups = {}, indices = [[], []] } = match;
        const nag = +(groups.nag ?? 0);
        switch (true) {
            case nag === 0:
                break;
            case nag <= 9:
                moveNag = +nag;
                break;
            case nag <= 135:
                positionNag = +nag;
                break;
            case nag <= 139:
                timeNag = +nag;
                break;
            default:
                console.warn('Potentially invalid nag token', nag);
        }
        const [[, end = 0]] = indices;
        nagLength = end - 1;
    }
    return { moveNag, positionNag, timeNag, nagLength };
}

/**
 * Parses a variation from a move text string
 *
 * @param fullMoveText - The move text string to parse
 * @param moveTextIndex - The index of the move text string
 * @param processingSAN - Whether the move text string is processing a SAN move
 * @returns The parsed variation and the length of the variation string
 */
function parseNextRav(fullMoveText: string, moveTextIndex = 0) {
    const moveText = fullMoveText.slice(moveTextIndex);

    let rav = '';
    let ravLength = 0;
    let depth = 0;

    for (let i = 0; i < moveText.length; i++) {
        const char = moveText[i];

        // Skip comments since they might have parantheses
        if (char === '{') {
            const { commentLength, comment } = parseNextComment(moveText, i);
            rav += comment;
            i += commentLength;
            continue;
        }

        rav += char;
        if (char === '(') {
            depth++;
        } else if (char === ')') {
            depth--;
            if (depth === 0) {
                ravLength = i;
                break;
            }
        }
    }

    return { rav, ravLength };
}

/**
 * Parses a comment from a move text string
 *
 * @param moveText - The move text string to parse
 * @param moveTextIndex - The index of the move text string
 * @param processingSAN - Whether the move text string is processing a SAN move
 * @returns The parsed comment and the length of the comment string
 */
function parseNextComment(fullMoveText: string, moveTextIndex: number) {
    const moveText = fullMoveText.slice(moveTextIndex);

    let comment = '';
    let commentLength = 0;

    for (let i = 0; i < moveText.length; i++) {
        const prevChar = moveText[i - 1];
        const char = moveText[i];
        comment += char;

        // Check if the comment is ended, PGN supports escaped brackets
        const isEndOfComment = char === '}' && prevChar !== '\\';
        if (isEndOfComment) {
            commentLength = i;
            break;
        }
    }

    return { comment, commentLength };
}

/**
 * Adds a comment to a move
 *
 * @param move - The move to add the comment to
 * @param comment - The comment to add
 * @param isBefore - Whether the comment is marked as beforeComment or afterComment
 * @returns The comment if it's not associated with a move, otherwise undefined
 */
function addCommentToMove(move: TChessPgnMove | undefined, comment: string, isBefore?: boolean) {
    if (move) {
        const trimmedComment = comment.replaceAll('\\}', '}').trim().slice(1, -1).trim(); // Remove escapes, first and last bracket and extra spaces before and after slice
        if (isBefore) {
            move.beforeComment = trimmedComment;
        } else {
            move.afterComment = trimmedComment;
        }
    } else {
        return comment;
    }
    return undefined;
}

/**
 * Adds a variation to a move
 *
 * @param move - The move to add the varation to
 * @param variant - The variation to add
 */
function addRavToMove(move: TChessPgnMove | undefined, variant: string) {
    if (move) {
        const trimmedVariant = variant.trim().slice(1, -1).trim(); // Remove first and last parenthesis and trim (double trim to remove extra spaces e.g. " ( <VARIANT> ) ")
        move.rav = [parseMoveText(trimmedVariant, move.turn)];
    }
}

/**
 * Adds a nag to a move
 *
 * @param move - The move to add the nag to
 * @param moveNag - This nag annotates the move just played (1-9)
 * @param positionNag - This nag annotates the position (10-135)
 * @param timeNag - This nag annotates the time (136-139)
 */
function addNagToMove(move: TChessPgnMove | undefined, moveNag: number, positionNag: number, timeNag: number) {
    if (move) {
        move.moveNag = moveNag ?? move.moveNag;
        move.positionNag = positionNag ?? move.positionNag;
        move.timeNag = timeNag ?? move.timeNag;
    }
}

/**
 * Parses a move text string
 *
 * @param moveText - The move text string to parse
 * @param turn - The turn of the move
 * @returns The parsed move text
 */
function parseMoveText(moveText: string, turn = 0): TChessPgnMove[] {
    const moves: TChessPgnMove[] = [];
    let currentPly = 0;
    let currentMove: TChessPgnMove | undefined;
    let currentTurn = turn;
    let processingSAN = '';
    let pendingComment: string | undefined; // Pending comment is used to store comments that are not associated with a move yet, it will be added as a before comment to the next move

    for (let i = 0; i < moveText.length; i++) {
        const char = moveText[i];
        const nextChar = moveText[i + 1];

        if (char === '{') {
            const { comment, commentLength } = parseNextComment(moveText, i);
            pendingComment = addCommentToMove(currentMove, comment);
            i += commentLength;
            continue; // Skip to the next character
        }

        if (/\d/.test(char) && !currentPly) {
            const { ply, plyLength } = parseMovePly(moveText, i);
            currentPly = ply;
            i += plyLength;
        } else if (currentPly) {
            if (/[BNRQKxa-h1-8+#O-]/.test(char)) {
                processingSAN += char;
                if (nextChar === ' ') {
                    currentMove = {
                        ply: currentPly,
                        san: processingSAN,
                        turn: currentTurn,
                    };
                    moves.push(currentMove);
                    currentTurn = +!currentTurn; // Switch turn
                    processingSAN = ''; // Reset processingSAN since next character is space means we're done with current SAN move string

                    if (pendingComment) {
                        pendingComment = addCommentToMove(currentMove, pendingComment, true);
                    }
                }
            } else if (char === ' ') {
                if (/\d/.test(nextChar)) {
                    // Chess moves always start with a letter, so if the next character is a number, then we're done with current ply (halfmove number)
                    currentPly = 0;
                } else if (nextChar === '(' && currentMove) {
                    // If the next character is an opening parenthesis, then we're parsing a variation
                    const { rav, ravLength } = parseNextRav(moveText, i);
                    addRavToMove(currentMove, rav);
                    i += ravLength;
                } else if (nextChar === '$' && currentMove) {
                    // If the next character is a dollar sign, then we're parsing a nag (there are 3 types of nags: https://www.saremba.de/chessgml/standards/pgn/pgn-complete.htm#c10)
                    const { moveNag, positionNag, timeNag, nagLength } = parseNextNag(moveText, i);
                    addNagToMove(currentMove, moveNag, positionNag, timeNag);
                    i += nagLength;
                }
            } else {
                throwIfProcessingSAN(moveText, i, processingSAN);
            }
        }
    }

    return moves;
}

/**
 * Parses a PGN string
 *
 * @param pgn - The PGN string to parse
 * @returns The parsed PGN with separate headers
 */
export function parsePgn(pgn: string): TChessPgn {
    const [headersText, fullMoveText] = pgn.split('\n\n');

    const headers: TChessPgnHeaders = {};
    const headersRegex = /\[(?<key>.*?) "(?<value>.*?)"]/g;
    let headersMatch;
    while ((headersMatch = headersRegex.exec(headersText)) !== null) {
        const { key, value } = headersMatch.groups ?? {};
        headers[key] = value;
    }

    const moveText = fullMoveText.replaceAll('\n', ' ').replaceAll('[ ]+', ' ').slice(0, fullMoveText.lastIndexOf(' '));
    const moves = parseMoveText(moveText);

    console.log(moves);

    return {
        headers,
        moves,
        moveText,
    };
}
