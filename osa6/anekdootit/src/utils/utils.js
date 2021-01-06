export const compareOnVotes = (x, y) => {
    if (x.votes < y.votes) {
      return 1
    }
    if (x.votes > y.votes) {
      return -1
    }
    return 0
  }
