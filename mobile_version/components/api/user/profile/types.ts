import { DateTime } from 'luxon';
import { JsonProperty, Serializable } from 'typescript-json-serializer';

//why property was changed?
const DATETIME_PROPERTY = { afterDeserialize: (val: string) => DateTime.fromISO(val) };
const DECIMAL_PROPERTY = { afterDeserialize: (val: string) => parseFloat(val) };
// const DATETIME_PROPERTY = { onDeserialize: (val: string) => DateTime.fromISO(val) }
// const DECIMAL_PROPERTY = { onDeserialize: (val: string) => parseFloat(val) }

@Serializable()
export class TokenCreate {
  @JsonProperty() password: string;
  @JsonProperty() email: string;
}

@Serializable()
export class TokenVerify {
  @JsonProperty() auth_token: string;
}

@Serializable()
export class ShortUser{
  @JsonProperty() pk: number;
  @JsonProperty() username: string;
  @JsonProperty() avatar: string;
  @JsonProperty() first_name: string;
}

@Serializable()
export class UserCreation {
  @JsonProperty() email: string;
  @JsonProperty() username: string;
  @JsonProperty() password: string;
}

@Serializable()
export class SetPassword {
  @JsonProperty() new_password: string;
  @JsonProperty() current_password: string;
}

@Serializable()
export class CardGet {
  @JsonProperty() id: number;
  @JsonProperty() datetime: string;
  @JsonProperty() number: number;
  @JsonProperty() date_year: string;
  @JsonProperty() cvc: string;
  @JsonProperty() creator: boolean;
  @JsonProperty() user: number;
}

@Serializable()
export class DonationGet {
  @JsonProperty() id: number;
  @JsonProperty() sender: UserGet;
  @JsonProperty() reciever: UserGet;
  @JsonProperty() datetime: string;
  @JsonProperty() amount: number;
}

@Serializable()
export class PaymentGet {
  @JsonProperty() id: number;
  @JsonProperty() card: CardGet;
  @JsonProperty() datetime: string;
  @JsonProperty() amount: number;
}

@Serializable()
export class PendingUserCreator {
  @JsonProperty() user: number;
  @JsonProperty() verified: boolean;
  @JsonProperty() photo: string;
  @JsonProperty() id: number;
}

@Serializable()
export class UserGet {
  @JsonProperty() pk: number;
  @JsonProperty() email: string;
  @JsonProperty() avatar: string;
  @JsonProperty() background_photo: string;
  @JsonProperty() username: string;
  @JsonProperty() first_name: string;
  @JsonProperty() bio: string;
  @JsonProperty() birthday_date: string;
  @JsonProperty() location: string;
  @JsonProperty() post_amount: number;
  @JsonProperty() fans_amount: number;
  @JsonProperty() repheral_link: string;
  @JsonProperty() repheral_users: [number];
  @JsonProperty() blocked_users: [number];
  @JsonProperty() email_notifications: boolean;
  @JsonProperty() push_notifications: boolean;
  @JsonProperty() hide_online: boolean;
  @JsonProperty() allow_comments: boolean;
  @JsonProperty() show_post_amount: boolean;
  @JsonProperty() show_fans_amount: boolean;
  @JsonProperty() show_watermark: boolean;
  @JsonProperty() validated_email: boolean;
  @JsonProperty() validated_user: boolean;
  @JsonProperty() credit_amount: number;
  @JsonProperty() earned_credits_amount: number;
}

@Serializable()
export class PendingUserCreation {
  @JsonProperty() id: number;
  @JsonProperty() photo: string;
  @JsonProperty() verified: true;
  @JsonProperty() user: number;
}

export class CardCreation {
  @JsonProperty() id: number;
  @JsonProperty() number: string;
  @JsonProperty() date_year: string;
  @JsonProperty() cvc: string;
  @JsonProperty() creator: boolean;
  @JsonProperty() user: number;
}
