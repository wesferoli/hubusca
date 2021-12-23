import { Text, View } from "react-native"
import { UserRepo } from "../UserRepo"
import { Container } from "./styles"

interface IUser {
  login: string;
  id: number;
  node_id?: string;
  avatar_url: string;
  gravatar_id?: string;
  url?: string;
  html_url?: string;
  followers_url?: string;
  following_url?: string;
  gists_url?: string;
  starred_url?: string;
  subscriptions_url?: string;
  organizations_url?: string;
  repos_url?: string;
  events_url?: string;
  received_events_url?: string;
  type?: string;
  site_admin?: boolean;
  name: string;
  company?: string;
  blog?: string;
  location: string;
  email?: string;
  hireable?: boolean;
  bio?: string;
  twitter_username?: string;
  public_repos: number;
  public_gists?: number;
  followers: number;
  following?: number;
  created_at?: string;
  updated_at?: string
}

interface Props {
  user: IUser
}

interface Data {
  key: number;
  title: string;
  content: number;
}

export const UserDetail: React.FC<Props> = ({ user }) => {
  const data: Data[] = [
    {key: 1, title: "ID", content: user.id},
    {key: 2, title: "Repos", content: user.public_repos},
    {key: 3, title: "Followers", content: user.followers}
  ]

  return (
    <Container>
      { data.map((data) => (
        <View key={data.key} style={{flex:1, alignItems: "center", justifyContent: "center"}}>
          <Text style={{marginBottom: 5}}>{ data.title }</Text>
          <Text style={{ fontSize: 16, fontWeight: "bold"}}>{ data.content }</Text>
        </View>
      )) }
    </Container>
  )
}