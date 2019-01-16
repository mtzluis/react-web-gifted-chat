import * as React from 'react';
import * as RN from 'react-native';

type ViewStyle = RN.StyleProp<RN.ViewStyle>;
type TextStyle = RN.StyleProp<RN.TextStyle>;
type ImageStyle = RN.StyleProp<RN.ImageStyle>;

export interface LeftRightStyle<T> {
  left: T;
  right: T;
}

export interface User {
  id: any;
  name?: string;
  avatar?: string;
}

export interface IMessage {
  id: any;
  text: string;
  createdAt: Date;
  user: User;
  image?: string;
  system?: boolean;
}

export type IChatMessage = IMessage

interface ActionsProps {
  // todo: onSend is not used
  onSend?(): void;
  options?: any;
  optionTintColor?: string;
  icon?(): void;
  wrapperStyle?: ViewStyle;
  containerStyle?: ViewStyle;
  iconTextStyle?: ViewStyle;
  onPressActionButton(): void;
}

export class Actions extends React.Component<ActionsProps> { }

interface AvatarProps<TMessage extends IMessage = IMessage> {
  renderAvatarOnTop: boolean;
  position: "left" | "right";
  currentMessage: TMessage;
  previousMessage: TMessage;
  nextMessage: TMessage;
  onPressAvatar(): void;
  renderAvatar(props: AvatarProps<TMessage>): JSX.Element;
  containerStyle: {
    left: any;
    right: any;
  };
  imageStyle: {
    left: any;
    right: any;
  };
  // TODO: remove in next major release
  isSameDay(currentMessage: TMessage, message: TMessage): boolean;
  isSameUser(currentMessage: TMessage, message: TMessage): boolean;
}

export class Avatar extends React.Component<AvatarProps> { }

interface BubbleProps<TMessage extends IMessage = IMessage> {
  user: User;
  touchableProps?: object;
  onLongPress?(context?: any, message?: any): void;
  renderMessageImage?(messageImageProps: RenderMessageImageProps): React.ReactNode;
  renderMessageText?(messageTextProps: MessageTextProps): React.ReactNode;
  renderCustomView?(bubbleProps: BubbleProps): React.ReactNode;
  renderTime?(timeProps: TimeProps): React.ReactNode;
  renderTicks?(currentMessage: TMessage): React.ReactNode;
  renderUsername?(): React.ReactNode;
  renderUsernameOnMessage?: boolean
  position?: "left" | "right";
  currentMessage?: TMessage;
  nextMessage?: TMessage;
  previousMessage?: TMessage;
  containerStyle?: LeftRightStyle<ViewStyle>;
  wrapperStyle: LeftRightStyle<ViewStyle>;
  bottomContainerStyle: LeftRightStyle<ViewStyle>;
  tickStyle: TextStyle;
  containerToNextStyle: LeftRightStyle<ViewStyle>;
  containerToPreviousStyle: LeftRightStyle<ViewStyle>;
  // TODO: remove in next major release
  isSameDay?(currentMessage: TMessage, nextMessage: TMessage): boolean;
  isSameUser?(currentMessage: TMessage, nextMessage: TMessage): boolean;
}

export class Bubble extends React.Component<BubbleProps> { }

interface ComposerProps {
  composerHeight?: number;
  text?: string;
  placeholder?: string;
  placeholderTextColor?: string;
  textInputProps?: Partial<RN.TextInputProps>;
  onTextChanged?(text: string): void;
  onInputSizeChanged?(contentSize: number): void;
  multiline?: boolean;
  textInputStyle?: RN.TextInputProps["style"];
  textInputAutoFocus?: boolean;
  keyboardAppearance: RN.TextInputProps["keyboardAppearance"];
}

export class Composer extends React.Component<ComposerProps> { }

interface DayProps<TMessage extends IMessage = IMessage> {
  currentMessage?: TMessage;
  previousMessage?: TMessage;
  containerStyle?: ViewStyle;
  wrapperStyle?: ViewStyle;
  textStyle?: TextStyle;
  // TODO: remove in next major release
  isSameDay?(currentMessage: TMessage, nextMessage: TMessage): boolean;
  isSameUser?(currentMessage: TMessage, nextMessage: TMessage): boolean;
  dateFormat?: string;
}

export class Day extends React.Component<DayProps> { }

interface GiftedAvatarProps {
  user?: User;
  onPress?(): void;
  avatarStyle?: ImageStyle;
  textStyle?: TextStyle;
}

export class GiftedAvatar extends React.Component<GiftedAvatarProps> { }

export interface GiftedChatProps<TMessage extends IMessage = IMessage> {
  /* Messages to display */
  messages?: TMessage[];
  /* Input text; default is undefined, but if specified, it will override GiftedChat's internal state */
  text?: string;
  /* Placeholder when text is empty; default is 'Type a message...' */
  placeholder?: string;
  /* Generate an id for new messages. Defaults to UUID v4, generated by uuid */
  messageIdGenerator?(message: TMessage): string;
  /* User sending the messages: { id, name, avatar } */
  user?: User;
  /* Callback when sending a message */
  onSend?(messages: TMessage[]): void;
  /*  Locale to localize the dates */
  locale?: string;
  /* Format to use for rendering times; default is 'LT' */
  timeFormat?: string;
  /* Format to use for rendering dates; default is 'll' */
  dateFormat?: string;
  /* Animates the view when the keyboard appears */
  isAnimated?: boolean;
  /* Enables the "Load earlier messages" button */
  loadEarlier?: boolean;
  /*Callback when loading earlier messages*/
  onLoadEarlier?(): void;
  /*Display an ActivityIndicator when loading earlier messages*/
  isLoadingEarlier?: boolean;
  /*  Render a loading view when initializing */
  renderLoading?(): React.ReactNode;
  /* Custom "Load earlier messages" button */
  renderLoadEarlier?(props: LoadEarlierProps): React.ReactNode;
  /* Custom message avatar; set to null to not render any avatar for the message */
  renderAvatar?(props: AvatarProps): React.ReactNode;
  /* Whether to render an avatar for the current user; default is false, only show avatars for other users */
  showUserAvatar?: boolean;
  /* When false, avatars will only be displayed when a consecutive message is from the same user on the same day; default is false */
  showAvatarForEveryMessage?: boolean;
  /* Callback when a message avatar is tapped */
  onPressAvatar?(user: User): void;
  /* Render the message avatar at the top of consecutive messages, rather than the bottom; default is false */
  renderAvatarOnTop?: boolean;
  /* Custom message bubble */
  renderBubble?(props: BubbleProps): React.ReactNode;
  /*Custom system message */
  renderSystemMessage?(props: SystemMessageProps): React.ReactNode;
  /* Callback when a message bubble is long-pressed; default is to show an ActionSheet with "Copy Text" (see example using showActionSheetWithOptions()) */
  onLongPress?(context: any, message: any): void;
  /* Reverses display order of messages; default is true */
  inverted?: boolean;
  /*Custom message container */
  renderMessage?(message: MessageProps): React.ReactNode;
  /* Custom message text */
  renderMessageText?(messageText: MessageTextProps): React.ReactNode;
  /* Custom message image */
  renderMessageImage?(props: RenderMessageImageProps): React.ReactNode;
  /* Extra props to be passed to the <Image> component created by the default renderMessageImage */
  imageProps?: MessageProps;
  /*Extra props to be passed to the MessageImage's Lightbox */
  lightboxProps?: any;
  /* Custom view inside the bubble */
  renderCustomView?(): React.ReactNode;
  /*Custom day above a message*/
  renderDay?(props: DayProps): React.ReactNode;
  /* Custom time inside a message */
  renderTime?(props: TimeProps): React.ReactNode;
  /* Custom footer component on the ListView, e.g. 'User is typing...' */
  renderFooter?(): React.ReactNode;
  /* Custom component to render below the MessageContainer (separate from the ListView) */
  renderChatFooter?(): React.ReactNode;
  /* Custom message composer container */
  renderInputToolbar?(props: InputToolbarProps): React.ReactNode;
  /*  Custom text input message composer */
  renderComposer?(props: ComposerProps): React.ReactNode;
  /* Custom action button on the left of the message composer */
  renderActions?(props: ActionsProps): React.ReactNode;
  /* Custom send button; you can pass children to the original Send component quite easily, for example to use a custom icon (example) */
  renderSend?(props: SendProps): React.ReactNode;
  /*Custom second line of actions below the message composer */
  renderAccessory?(props: InputToolbarProps): React.ReactNode;
  /*Callback when the Action button is pressed (if set, the default actionSheet will not be used) */
  onPressActionButton?(): void;
  /*Distance of the chat from the bottom of the screen (e.g. useful if you display a tab bar) */
  bottomOffset?: number;
  /* Minimum height of the input toolbar; default is 44 */
  minInputToolbarHeight?: number;
  /*Extra props to be passed to the messages <ListView>; some props can't be overridden, see the code in MessageContainer.render() for details */
  listViewProps?: any;
  /*  Extra props to be passed to the <TextInput> */
  textInputProps?: any;
  /*Determines whether the keyboard should stay visible after a tap; see <ScrollView> docs */
  keyboardShouldPersistTaps?: any;
  /* Callback when the input text changes */
  onInputTextChanged?(text: string): void;
  /*Max message composer TextInput length */
  maxInputLength?: number;
  /* Custom parse patterns for react-native-parsed-text used to linkify message content (like URLs and phone numbers) */
  parsePatterns?(): React.ReactNode;
  /* Force getting keyboard height to fix some display issues */
  forceGetKeyboardHeight?: boolean;
  /* Force send button */
  alwaysShowSend?: boolean;
  /* Image style */
  imageStyle?: ViewStyle
  /* This can be used to pass any data which needs to be re-rendered */
  extraData?: any;
  /* composer min Height */
  minComposerHeight?: number;
  /* composer min Height */
  maxComposerHeight?: number;
}

export class GiftedChat extends React.Component<GiftedChatProps> {
  static defaultProps: GiftedChatProps;
  static append<TMessage extends IMessage = IMessage>(
    currentMessages: TMessage[],
    messages: TMessage[],
    inverted?: boolean
  ): TMessage[];
  static prepend<TMessage extends IMessage = IMessage>(
    currentMessages: TMessage[],
    messages: TMessage[],
    inverted?: boolean
  ): TMessage[];
}

interface InputToolbarProps {
  renderAccessory?(props: InputToolbarProps): React.ReactNode;
  renderActions?(props: ActionsProps): React.ReactNode;
  renderSend?(props: SendProps): React.ReactNode;
  renderComposer?(props: ComposerProps): React.ReactNode;
  onPressActionButton?(): void;
  containerStyle?: ViewStyle;
  primaryStyle?: ViewStyle;
  accessoryStyle?: ViewStyle;
}
export class InputToolbar extends React.Component<InputToolbarProps> { }

interface LoadEarlierProps {
  onLoadEarlier?(): void;
  isLoadingEarlier: boolean;
  label?: string;
  containerStyle?: ViewStyle;
  wrapperStyle?: ViewStyle;
  textStyle?: TextStyle;
  activityIndicatorStyle?: ViewStyle;
}

export class LoadEarlier extends React.Component<LoadEarlierProps> { }

interface MessageProps<TMessage extends IMessage = IMessage> {
  // TODO: this is not used
  renderAvatar(props: AvatarProps): React.ReactNode;
  showUserAvatar?: boolean;
  renderBubble(props: BubbleProps): React.ReactNode;
  renderDay(props: DayProps): React.ReactNode;
  renderSystemMessage(props: SystemMessageProps): React.ReactNode;
  position?: "left" | "right";
  currentMessage?: TMessage;
  nextMessage?: TMessage;
  previousMessage?: TMessage;
  user?: User;
  inverted?: boolean;
  containerStyle: LeftRightStyle<ViewStyle>;
}

export class Message extends React.Component<MessageProps> { }

interface MessageContainerProps<TMessage extends IMessage = IMessage> {
  messages?: TMessage[];
  user?: User;
  renderFooter?(props: MessageContainerProps): React.ReactNode;
  renderMessage?(props: MessageProps): React.ReactNode;
  renderLoadEarlier?(props: LoadEarlierProps): React.ReactNode;
  // todo: not used
  onLoadEarlier?(): void;
  listViewProps: Partial<RN.ListViewProps>;
  inverted?: boolean;
  loadEarlier?: boolean;
  // todo: should be InvertibleScrollView props
  invertibleScrollViewProps?: object;
}

export class MessageContainer extends React.Component<MessageContainerProps> { }

interface MessageImageProps<TMessage extends IMessage = IMessage> {
  currentMessage?: TMessage;
  containerStyle?: ViewStyle;
  imageStyle?: ImageStyle;
  imageProps?: Partial<RN.ImageProps>;
  // todo: should be LightBox properties
  lightboxProps?: object;
}

export class MessageImage extends React.Component<MessageImageProps> { }

export type RenderMessageImageProps<TMessage extends IMessage = IMessage> =
  MessageImageProps<TMessage> & Exclude<BubbleProps<TMessage>, 'wrapperStyle' | 'containerStyle'>

interface MessageTextProps<TMessage extends IMessage = IMessage> {
  position: "left" | "right";
  currentMessage?: TMessage;
  containerStyle?: LeftRightStyle<ViewStyle>;
  textStyle?: LeftRightStyle<TextStyle>;
  linkStyle?: LeftRightStyle<TextStyle>;
  parsePatterns?(linkStyle: TextStyle): any;
  textProps?: RN.TextProps;
  customTextStyle?: TextStyle;
}

export class MessageText extends React.Component<MessageTextProps> { }

export type RenderMessageTextProps<TMessage extends IMessage = IMessage> =
  MessageTextProps<TMessage> & Exclude<BubbleProps<TMessage>, 'wrapperStyle' | 'containerStyle'>

interface SendProps {
  text?: string;
  onSend?({ text }: { text: string }, b: boolean): void;
  label?: string;
  containerStyle?: ViewStyle;
  textStyle?: TextStyle;
  children?: React.ReactNode;
}

export class Send extends React.Component<SendProps> { }

interface SystemMessageProps<TMessage extends IMessage = IMessage> {
  currentMessage?: TMessage;
  containerStyle?: ViewStyle;
  wrapperStyle?: ViewStyle;
  textStyle?: TextStyle;
}

export class SystemMessage extends React.Component<SystemMessageProps> { }

interface TimeProps<TMessage extends IMessage = IMessage> {
  position?: "left" | "right";
  currentMessage?: TMessage;
  containerStyle?: LeftRightStyle<ViewStyle>;
  textStyle?: LeftRightStyle<TextStyle>;
  timeFormat?: string;
}

export class Time extends React.Component<TimeProps> { }

export type utils<TMessage extends IMessage = IMessage> = {
  isSameUser(currentMessage?: TMessage, message?: TMessage): boolean;
  isSameDay(currentMessage?: TMessage, message?: TMessage): boolean;
  isSameTime(currentMessage?: TMessage, message?: TMessage): boolean;
};

export const utils: utils;
