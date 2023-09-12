import React from 'react';
import { GlobalSizes } from '../../../enums/sizes';
import { Avatar as FlowBiteAvatar, Spinner } from 'flowbite-react';
import { useAuth0 } from '@auth0/auth0-react';
import { User } from '@auth0/auth0-spa-js/src/global';
import { toUpper } from 'lodash';
import * as z from 'zod';
import flowbiteThemeOverride from '../../../themes/flowbiteThemeOverride';

export type AvatarProps = {
  size?:
    | GlobalSizes.xSmall
    | GlobalSizes.small
    | GlobalSizes.medium
    | GlobalSizes.large
    | GlobalSizes.xLarge;
  circle?: boolean;
  user?: User;
  children?: React.ReactNode;
};

const UserSchema = z.object({
  email: z.string().email().optional(),
  family_name: z.string().optional(),
  given_name: z.string().optional(),
  picture: z.string().url().optional(),
});

const AvatarPropsSchema: z.ZodSchema<AvatarProps> = z
  .object({
    size: z
      .enum([
        GlobalSizes.xSmall,
        GlobalSizes.small,
        GlobalSizes.medium,
        GlobalSizes.large,
        GlobalSizes.xLarge,
      ])
      .optional(),
    children: z.any().optional(),
    rounded: z.boolean().optional(),
    user: UserSchema.optional(),
  })
  .superRefine((data, ctx) => {
    if (
      (data.user?.email && data.user?.picture) ||
      (data.user?.family_name && data.user?.given_name)
    )
      return true;

    if (!data.user?.picture) {
      if (
        !data.user?.email &&
        (!data.user?.family_name || !data.user?.given_name)
      ) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message:
            'If user.picture is null then it must a family_name and given_name or a email',
          path: ['user'],
        });
      }
    }
  });

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export function Avatar(props: AvatarProps): React.JSX.Element {
  const size = props.size || GlobalSizes.medium;

  const { isLoading, error, user } = useAuth0();

  if (!props.user && isLoading) return <Spinner size={size} />;
  if (error) return <div>failed to load</div>;
  if (user || props.user) {
    const avatarUser: User = props.user ? props.user : (user as User);

    if (avatarUser.picture && avatarUser.picture !== 'null')
      return (
        <FlowBiteAvatar
          size={size}
          img={avatarUser.picture}
          rounded={props.circle}
          theme={flowbiteThemeOverride.avatar}
        >
          {props.children}
        </FlowBiteAvatar>
      );

    const initials =
      avatarUser.given_name && avatarUser.family_name
        ? toUpper(
            `${avatarUser.given_name.slice(0, 1)}${avatarUser.family_name.slice(
              0,
              1,
            )}`,
          )
        : toUpper(avatarUser.email?.slice(0, 2));

    return (
      <FlowBiteAvatar
        color={'midnightBlue'}
        placeholderInitials={initials}
        size={size}
        rounded={props.circle}
        theme={flowbiteThemeOverride.avatar}
      >
        {props.children}
      </FlowBiteAvatar>
    );
  }

  return (
    <FlowBiteAvatar size={size} rounded={props.circle}>
      {props.children}
    </FlowBiteAvatar>
  );
}
