export type CardType = {
  number: number;
  date_year: string;
  cvc: string;
  creator: boolean | null;
  user: number;
};

export type DonationType = {
  amount: number;
  sender: number;
  reciever: number;
};
export type PaymentType = {
  amount: number;
  card: number;
};
export type SubscriptionType = {
  end_date: string;
  source: number;
  target: number;
};

export type createCardRT = {
  id: number | null | undefined;
  number: number;
  date_year: string;
  cvc: string;
  creator: boolean | null;
  user: number;
};
export type createDonationRT = {
  id: number | null;
  amount: number | null;
  sender: number;
  reciever: number;
};
export type createPaymentRT = {
  id: number | null;
  amount: number;
  card: number;
};
export type createSubscriptionRT = {
  id: number | null;
  end_date: string | null;
  source: number | null;
  start_date: string | null;
  target: number;
};

export type settingsValType = {
  isDisabled: boolean;
  values: any;
  submit: () => void;
  setFieldValue: (field: string, value: any, shouldValidate?: boolean) => void;
};

export type createUserT = {
  id: number | string | null | undefined;
  email: string | null;
  username: string | null;
  password: string;
};
export type idType = {
  id: number;
};
export type userType = {
  pk: number | null;
  username: string | null;
  avatar: string | null;
  first_name: string | null;
  background_photo: string | null;
};

export type getCardRT = {
  id: number | null;
  user: userType;
  number: number;
  date_year: string;
  cvc: string;
  creator: boolean | null;
};
export type getDonationRT = {
  id: number | null;
  sender: userType;
  reciever: userType;
  datetime: string | null;
  amount: number | null;
};

export type getPaymentRT = {
  id: number | null;
  card: getCardRT;
  datetime: string;
  amount: number;
};
export type getUserRT = {
  subscribtion_price: number | null;
  pk: number | null;
  email: string | null;
  avatar: string | null;
  background_photo: string | null;
  username: string | null;
  first_name: string | null;
  bio: string | null;
  birthday_date: string | null;
  location: string;
  subscription_price: number | null;
  message_price: number | null;
  post_amount: number | null;
  fans_amount: number | null;
  repheral_link: string | null;
  repheral_users: Array<number>;
  blocked_users: Array<number>;
  email_notifications: boolean | null;
  push_notifications: boolean | null;
  hide_online: boolean | null;
  allow_comments: boolean | null;
  show_post_amount: boolean | null;
  show_fans_amount: boolean | null;
  show_watermark: boolean | null;
  validated_email: boolean | null;
  validated_user: boolean | null;
  credit_amount: number | null;
  earned_credits_amount: number | null;
  posts: Array<any>;
};

export type userStringType = {
  user: string | null;
};
export type onlineUserRetrieveRT = {
  user: string | null;
  last_action: string;
};
export type userGetCardListRT = {
  count: number | null;
  next: string | null;
  previous: string | null;
  results: createCardRT;
};
export type userDonationRecievedRT = {
  count: number | null;
  next: string | null;
  previous: string | null;
  results: getDonationRT;
};
export type userGetPaymentHistoryRT = {
  count: number | null;
  next: string | null;
  previous: string | null;
  results: getPaymentRT;
};
export type userValidateUserRT = {
  id: number | null;
  photo: string | null;
  verified: boolean | null;
  user: number;
};

export type PostType = {
  id: number | null;
  time_to_archive: string;
  reply_link: string;
  name: string;
  description: string;
  price_to_watch: number;
  enabled_comments: boolean;
  access_level: number;
  archived: boolean;
  user: number;
  favourites: Array<number>;
  attachments: Array<number>;
};
export type createAttachmentRT = {
  id: number | null;
  _file: string | null;
  file_type: number | null;
};
export type createPostActionRT = {
  like: boolean | null;
  comment: string | null;
  donation_amount: number | null;
  parent: number | null;
  user: number;
  post: number;
  date_time: null | undefined | string;
  id: number | null;
};
export type createPostBoughtRT = {
  id: number | null;
  user: number | null;
  amount: number | null;
  post: number;
};
export type createStoryActionRT = {
  id: number | null;
  datetime: string | null;
  comment: string | null;
  like: boolean | null;
  watched: boolean | null;
  time_watched: number | null;
  source: number;
  target: number;
};
export type createStoryRT = {
  id: number | null;
  time_to_archive: string | null;
  story: string | null;
  reply_link: string | null;
  archived: boolean | null;
  user: number;
  watched_story: Array<number>;
};
export type deleteStoryRT = {
  id: number | null;
  user: userType;
  watched_story: Array<userType>;
  publication_date: string;
  time_to_archive: string | null;
  story: string | null;
  reply_link: string | null;
  archived: boolean | null;
};
export type getMainPageRT = {
  posts: Array<PostType> | null;
  stories: Array<unknown>;
  recommendations: Array<any>;
};
