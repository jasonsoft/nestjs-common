/**
 * Wait for the specified number of seconds
 * 等待指定的秒数
 * Added by Jason.Song (成长的小猪) on 2023/03/22 22:31:59
 * @param seconds The number of seconds to wait 等待的秒数
 * @returns
 */
export const sleep = (seconds: number) =>
  new Promise((resolve) => setTimeout(resolve, seconds * 1000));
