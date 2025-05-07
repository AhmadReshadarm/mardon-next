// export const handleHistory = (productId: any) => {
//   const history = localStorage.getItem('history');

//   if (history) {
//     const historyDestringefied = JSON.parse(history);
//     const newHistory: any = [];
//     for (let i = 0; i < historyDestringefied.length; i++) {
//       if (productId != historyDestringefied[i]) {
//         newHistory[0] = productId;
//       }
//       if (newHistory[0] != historyDestringefied[i]) {
//         newHistory.push(historyDestringefied[i]);
//       }
//     }

//     localStorage.setItem('history', JSON.stringify([...newHistory]));
//   }
//   if (!history) {
//     localStorage.setItem('history', JSON.stringify([productId]));
//   }
// };

export const handleHistory = (productId: any) => {
  const MAX_HISTORY = 24;
  const history = localStorage.getItem('history');

  if (history) {
    const historyArray: any[] = JSON.parse(history);

    // Create new array with the latest product first, removing duplicates
    const newHistory = [
      productId,
      ...historyArray.filter((id) => id !== productId),
    ].slice(0, MAX_HISTORY); // Keep only first 24 items

    localStorage.setItem('history', JSON.stringify(newHistory));
  } else {
    localStorage.setItem('history', JSON.stringify([productId]));
  }
};
