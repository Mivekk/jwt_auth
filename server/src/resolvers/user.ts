import { User } from "../entity/User";
import {
  Resolver,
  Query,
  Mutation,
  Arg,
  ObjectType,
  Field,
  Ctx,
  UseMiddleware,
} from "type-graphql";
import argon2 from "argon2";
import { ApolloContext } from "../types";
import { createAccessToken, createRefreshToken } from "../auth";
import { isAuth } from "../middleware";
import { sendRefreshToken } from "../sendRefreshToken";

@ObjectType()
class LoginResponse {
  @Field()
  accessToken: string;
}

@Resolver()
export class UserResolver {
  @Query(() => String)
  hello(): string {
    return "hello world!";
  }

  @Query(() => String)
  @UseMiddleware(isAuth)
  bye(@Ctx() { payload }: ApolloContext): string {
    return `bye ${payload!.userId}!`;
  }

  @Query(() => [User])
  async users(): Promise<User[]> {
    return User.find({});
  }

  @Mutation(() => Boolean)
  async revokeRefreshTokensForUser(
    @Arg("userId", () => Number) userId: number
  ) {
    const user = await User.findOneBy({ id: userId });

    if (!user) {
      throw new Error("user not found");
    }

    await User.update({ id: userId }, { tokenVersion: user.tokenVersion + 1 });

    return true;
  }

  @Mutation(() => LoginResponse)
  async login(
    @Arg("email") email: string,
    @Arg("password") password: string,
    @Ctx() { res }: ApolloContext
  ): Promise<LoginResponse> {
    const user = await User.findOneBy({ email });

    if (!user) {
      throw new Error("invalid login");
    }

    const valid = await argon2.verify(user.password, password);

    if (!valid) {
      throw new Error("invalid password");
    }

    sendRefreshToken(res, createRefreshToken(user));

    return {
      accessToken: createAccessToken(user),
    };
  }

  @Mutation(() => [User], { nullable: true })
  async register(
    @Arg("email") email: string,
    @Arg("password") password: string
  ): Promise<User[] | null> {
    const hashedPassword = await argon2.hash(password);

    try {
      await User.insert({
        email,
        password: hashedPassword,
      });
    } catch (err) {
      console.log(err);
      return null;
    }

    return await User.findBy({});
  }
}
