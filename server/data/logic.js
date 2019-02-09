import { AuthenticationError, ForbiddenError } from 'apollo-server';
import { Message } from './connectors';
// reusable function to check for a user with context
function getAuthenticatedUser(ctx) {
  return ctx.user.then((user) => {
    if (!user) {
      throw new AuthenticationError('Unauthenticated');
    }
    return user;
  });
}

export const messageLogic = {
  createMessage(
    _,
    {
      message: { text, groupId },
    },
    ctx,
  ) {
    return getAuthenticatedUser(ctx).then(user => user.getGroups({ where: { id: groupId }, attributes: ['id'] }).then((group) => {
      if (group.length) {
        return Message.create({
          userId: user.id,
          text,
          groupId,
        });
      }
      throw new ForbiddenError('Unauthorized');
    }));
  },
};
// user => user.findAll({ where: { id } }).then(res => console.log(res))
export const groupLogic = {
  async updateGroup(_, { group: { id, name } }, ctx) {
    const group = await getAuthenticatedUser(ctx).then(user => user.getGroups({ where: { id } }).then(group => {
      if (group[0].admin === user.id) return group[0].update({ name })
      throw new ForbiddenError('Unauthorized');
    }));
    return group;
  }
};

export const changeUserNameLogic = {
  async changeUserName(_, { id, username }, ctx) {
    const users = await getAuthenticatedUser(ctx).then(user => user.update({ username }));

    return users;
  },
};
export const changeUserMailLogic = {
  async changeUserMail(_, { id, email }, ctx) {
    const users = await getAuthenticatedUser(ctx).then(user => user.update({ email }));

    return users;
  },
};
