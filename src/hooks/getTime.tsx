export default function getTime(data: any) {
  const date = new Date(data);
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();
  return `${year}년 ${month}월 ${day}일 ${hours}:${minutes}:${seconds}`;
}
