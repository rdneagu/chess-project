import { Button, Group, Stack, Textarea } from '@mantine/core';
import { useState } from 'react';
import { useForm } from '@mantine/form';
import ChessBoard from './_components/ChessBoard/ChessBoard';
import ChessMoveSet from './_components/ChessHistory/ChessMoveSet';
import ChessProvider from '@/shared/contexts/ChessContext/ChessProvider';
import useChess from '@/shared/hooks/useChess';
// const pgn1 = `
// [Event "25th ch-EUR Indiv 2025"]
// [Site "Eforie Nord ROU"]
// [Date "2025.03.15"]
// [Round "1.102"]
// [White "Seemann,Jakub"]
// [Black "Ciolacu,Alessia-Mihaela"]
// [Result "1-0"]
// [WhiteTitle "IM"]
// [BlackTitle "WIM"]
// [WhiteElo "2491"]
// [BlackElo "2136"]
// [ECO "A14"]
// [Opening "English"]
// [Variation "Neo-Catalan declined"]
// [WhiteFideId "21874697"]
// [BlackFideId "1252640"]
// [EventDate "2025.03.15"]

// 1. Nf3 d5 2. g3 e6 3. Bg2 Nf6 4. O-O Be7 5. c4 dxc4 6. Na3 Bxa3 7. bxa3 O-O 8.
// Qc2 Nc6 9. Bb2 Re8 10. Ng5 h6 11. Bxf6 Qxf6 12. Qh7+ Kf8 13. Ne4 Qg6 14. Qxg6
// fxg6 15. f4 Na5 16. Nf2 Rd8 17. d3 Bd7 18. Rab1 Rab8 19. Be4 Be8 20. Ng4 cxd3
// 21. exd3 Nc6 22. Rfc1 Rd6 23. Kf2 h5 24. Ne5 Nxe5 25. fxe5 Rd7 26. Ke3 b6 27. d4
// Rbd8 28. Rc4 g5 29. Rbc1 a5 30. Bc6 Rf7 31. Bxe8 Rxe8 32. Rxc7 Rf5 33. Ke4 Rf2
// 34. R1c2 Rf1 35. Rd7 Re7 36. Rd6 b5 37. Ra6 Rd1 38. a4 Rd7 39. Rd6 Ke7 40. Rxd7+
// Kxd7 41. axb5 Rb1 42. a4 Rb4 43. Rc6 Rxa4 44. Rd6+ Ke7 45. Ra6 Ra2 46. Ra7+ Kd8
// 47. b6 Rb2 48. Rxg7 Rxb6 49. Rxg5 h4 50. gxh4 Rb2 51. Kf4 Rxh2 52. Kg3 Rh1 53.
// Rg8+ Ke7 54. Ra8 Rd1 55. Ra7+ Kf8 56. Kf4 Rxd4+ 57. Kg5 a4 58. h5 Kg8 59. h6 Re4
// 60. Kf6 Rh4 61. h7+ Kh8 62. Kxe6 Rh6+ 63. Kd5 a3 64. Rxa3 Kxh7 65. Rg3 Rh1 66.
// e6 Rd1+ 67. Kc6 Rc1+ 68. Kd7 Rd1+ 69. Ke8 Re1 70. e7 Re4 71. Rd3 Kg7 72. Kd7 1-0`;

// const pgn2 = `[Event "?"]
// [Site "?"]
// [Date "????.??.??"]
// [Round "?"]
// [White "?"]
// [Black "?"]
// [Result "*"]
// [Link "https://www.chess.com/analysis/library/4uNL5wDqzE?tab=analysis"]

// 1. e4 e5 2. Nf3 Nc6 3. Bc4 Nf6 4. d3 Bc5 5. O-O {comment after} d6 6. c3 (6. Re1 Ng4 7. Re2 O-O
// ({comment before} 7... Be6 {comment after} 8. Ng5 (8. h3 {comment after}))) 6... O-O 7. Re1 a5
// 8. Bb5 Bd7 *`;

const pgn3 = `[Event "Wch1"]
[Site "U.S.A."]
[Date "1886.??.??"]
[Round "9"]
[White "Zukertort, Johannes"]
[Black "Steinitz, Wilhelm"]
[Result "0-1"]
[ECO "D26h"]
[Annotator "JvR"]

1. d4 $3 d5 $3 2. c4 $1 e6 $1 3. Nc3 $5 Nf6 $5 4. Nf3 $6  dxc4 $6  5. e3 $2 c5 $2 6. Bxc4 $4
cxd4 $4 7. exd4 $9 Be7 $9 8.O-O
O-O 9.Qe2 Nbd7 {This knight wants to blockades on d5.} 10.Bb3 Nb6 11.Bf4
( 11.Re1 {keeps the initiative.} )
11...Nbd5 12.Bg3 Qa5 13.Rac1 Bd7 14.Ne5 Rfd8 15.Qf3 Be8 16.Rfe1 Rac8 17.
Bh4 {Intends 18.Nxd5 exd5.} 17...Nxc3 18.bxc3 Qc7 {Black pressures on the
hanging pawns.} 19.Qd3
( 19.Bg3 {!} 19...Bd6 20.c4 {(Lasker).} )
19...Nd5 20.Bxe7 Qxe7 21.Bxd5 {?!}
( 21.c4 Qg5 22.Rcd1 Nf4 23.Qg3 {steers towards a slight advantage in
the endgame.} )
21...Rxd5 22.c4 Rdd8 23.Re3 {The attack will fail.}
( 23.Rcd1 {is solid.} )
23...Qd6 24.Rd1 f6 25.Rh3 {!?} 25...h6 {!}
( 25...fxe5 26.Qxh7+ Kf8 27.Rg3 {!} 27...Rd7
( 27...Rc7 28.Qh8+ Ke7 29.Rxg7+ Bf7 30.Qh4+ {(Euwe)} )
28.Qh8+ Ke7 29.Qh4+ Kf7 30.Qh7 {} )
26.Ng4 Qf4 {!} 27.Ne3 Ba4 {!} 28.Rf3 Qd6 29.Rd2
( 29.Rxf6 {?} 29...Bxd1 {!} )
29...Bc6 {?}
( 29...b5 {!} 30.Qg6 {!?}
( 30.cxb5 Rc1+ 31.Nd1 Qxd4 32.Qxd4 Rxd4 33.Rxd4 Bxd1 $19 {
(Vukovic).} )
30...Qf8 31.Ng4 Rxc4 {!} 32.Nxh6+ Kh8 33.h3 gxh6 34.Rxf6 Qg7 {is good
for Black).} )
30.Rg3 {?}
( 30.d5 {!} 30...Qe5 {!}
( 30...exd5 {(Steinitz)} 31.Nf5 {(Euwe)} )
31.Qb1 {Forestalls ..b5 and protects the first rank.} 31...exd5 32.
cxd5 {} 32...Bxd5 {??} 33.Rf5 )
30...f5 {Threatens ..f4.} 31.Rg6 {!?}
( 31.Nd1 f4 32.Rh3 e5 {!} 33.d5 Bd7 $19 )
31...Be4 32.Qb3 Kh7
( 32...Kf7 {(protects e6)} 33.c5 Qe7 {!} 34.Rg3 f4 )
33.c5 Rxc5 34.Rxe6
( 34.Qxe6 Rc1+ $19 )
34...Rc1+ 35.Nd1
( 35.Nf1 Qc7 $19 {!} )
35...Qf4 36.Qb2 Rb1 37.Qc3 Rc8 {Utilises the unprotected first rank.} 38.
Rxe4 Qxe4 {Many authors praise the high level of this positional game. The
score had become 4-4. The match continued in New Orleans.} 0-1`;

// const pgn4 = `[Event "?"]
// [Site "?"]
// [Date "????.??.??"]
// [Round "?"]
// [White "?"]
// [Black "?"]
// [Result "*"]
// [Link "https://www.chess.com/analysis?tab=analysis"]

// 1. d4 e5 2. c3 f5 ({{asdad { asda { \\} \\}\\}  \\} \\} \\} \\} \\}aasd \\}} 2... f6
// {{asdad { asda { \\} \\}\\}  \\} \\} \\} \\} \\}aasd \\}} 3. Be3 b6 4. Nh3 Nh6 5. Qc2
// Qe7) *`;

export default function Chess() {
    const chess = useChess();
    const { moveList } = chess;

    const [pgn, setPgn] = useState('');

    const form = useForm({
        initialValues: {
            pgn: pgn3,
        },
    });

    return (
        <ChessProvider pgn={pgn} chess={chess}>
            <Stack className="m-auto">
                <form onSubmit={form.onSubmit((values) => setPgn(values.pgn))} className="min-w-[600px]">
                    <Stack>
                        {/* eslint-disable-next-line react/jsx-props-no-spreading */}
                        <Textarea {...form.getInputProps('pgn')} autosize minRows={6} maxRows={6} />
                        <Button type="submit" className="ml-auto">
                            Submit
                        </Button>
                    </Stack>
                </form>
                {pgn && (
                    <Group align="center">
                        <ChessBoard />
                        <div className="max-h-[600px] w-[512px] overflow-auto rounded bg-slate-800">
                            <ChessMoveSet moves={moveList.moves} />
                        </div>
                    </Group>
                )}
            </Stack>
        </ChessProvider>
    );
}
