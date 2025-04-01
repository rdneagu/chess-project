import { useMemo } from 'react';
import ChessBoard from './_components/ChessBoard/ChessBoard';

export default function CorePage() {
  const pgn = useMemo(
    () => `[Event "25th ch-EUR Indiv 2025"]
      [Site "Eforie Nord ROU"]
      [Date "2025.03.15"]
      [Round "1.102"]
      [White "Seemann,Jakub"]
      [Black "Ciolacu,Alessia-Mihaela"]
      [Result "1-0"]
      [WhiteTitle "IM"]
      [BlackTitle "WIM"]
      [WhiteElo "2491"]
      [BlackElo "2136"]
      [ECO "A14"]
      [Opening "English"]
      [Variation "Neo-Catalan declined"]
      [WhiteFideId "21874697"]
      [BlackFideId "1252640"]
      [EventDate "2025.03.15"]
      
      1. Nf3 d5 2. g3 e6 3. Bg2 Nf6 4. O-O Be7 5. c4 dxc4 6. Na3 Bxa3 7. bxa3 O-O 8.
      Qc2 Nc6 9. Bb2 Re8 10. Ng5 h6 11. Bxf6 Qxf6 12. Qh7+ Kf8 13. Ne4 Qg6 14. Qxg6
      fxg6 15. f4 Na5 16. Nf2 Rd8 17. d3 Bd7 18. Rab1 Rab8 19. Be4 Be8 20. Ng4 cxd3
      21. exd3 Nc6 22. Rfc1 Rd6 23. Kf2 h5 24. Ne5 Nxe5 25. fxe5 Rd7 26. Ke3 b6 27. d4
      Rbd8 28. Rc4 g5 29. Rbc1 a5 30. Bc6 Rf7 31. Bxe8 Rxe8 32. Rxc7 Rf5 33. Ke4 Rf2
      34. R1c2 Rf1 35. Rd7 Re7 36. Rd6 b5 37. Ra6 Rd1 38. a4 Rd7 39. Rd6 Ke7 40. Rxd7+
      Kxd7 41. axb5 Rb1 42. a4 Rb4 43. Rc6 Rxa4 44. Rd6+ Ke7 45. Ra6 Ra2 46. Ra7+ Kd8
      47. b6 Rb2 48. Rxg7 Rxb6 49. Rxg5 h4 50. gxh4 Rb2 51. Kf4 Rxh2 52. Kg3 Rh1 53.
      Rg8+ Ke7 54. Ra8 Rd1 55. Ra7+ Kf8 56. Kf4 Rxd4+ 57. Kg5 a4 58. h5 Kg8 59. h6 Re4
      60. Kf6 Rh4 61. h7+ Kh8 62. Kxe6 Rh6+ 63. Kd5 a3 64. Rxa3 Kxh7 65. Rg3 Rh1 66.
      e6 Rd1+ 67. Kc6 Rc1+ 68. Kd7 Rd1+ 69. Ke8 Re1 70. e7 Re4 71. Rd3 Kg7 72. Kd7 1-0`,
    [],
  );

  return <ChessBoard pgn={pgn} />;
}
