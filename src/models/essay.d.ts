/**
 * 文章类别
 */
export type EssayType = {
  id: number;
  title: string;
  author: string;
  content: string;
  tags: string;
  path: string;
  favourNum: number;
  thumbNum: number;
  createTime: Date;
  updateTime: Date;
};
