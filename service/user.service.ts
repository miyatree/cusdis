import { nanoid } from "nanoid";
import { RequestScopeService } from ".";
import { prisma } from "../utils.server";

export class UserService extends RequestScopeService {
  async update(userId: string, options: {
    notificationEmail?: string,
    enableNewCommentNotification?: boolean
  }) {
    await prisma.user.update({
      where: {
        id: userId
      },
      data: {
        notificationEmail: options.notificationEmail,
        enableNewCommentNotification: options.enableNewCommentNotification
      }
    })
  }

  // return unsubscribeNewCommentToken, if doesn't exist, generate one
  async generateUnsubscribeNewCommentToken(userId: string) {
    const token = nanoid(24)
    await prisma.user.update({
      where: {
        id: userId
      },
      data: {
        unsubscribeNewCommentToken: token
      }
    })
    return token
  }
}