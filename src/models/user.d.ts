/**
 * 用户类别
 */
export type UserType = {
  id: number;
  username: string;
  userAccount: string;
  userAvatar?: string;
  userProfile?: string;
  userStatus: number;
  userRole: number;
  tags: string;
  createTime: Date;
};
