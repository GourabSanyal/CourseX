function calculateSum(a: number, b: number, type: string): number {
    if( type === 'sum') {
      return a+b
    } 
    if (type === 'sub') {
      return a-b
    }
    if ( type === 'mul'){
      return a*b
    }
    if ( type === 'div'){
      return a/b
    }
    return -1
  }
  
  const ans = calculateSum(2,2,'div1')
  console.log(ans);
  