import { useState } from "react";
import { ScrollView, Text, View } from "react-native";
import { UserCard } from "../../components/UserCard";
import githubApi from "../../services/api";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { Body, TextInput, ButtonContainer } from "./styles";

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

interface IRepo {
  id: number,
  node_id?: string,
  name: string,
  full_name?: string,
  private?: boolean,
  owner?: {
    login: string,
    id: number,
    node_id: string,
    avatar_url: string,
    gravatar_id: string,
    url: string,
    html_url: string,
    followers_url: string,
    following_url: string,
    gists_url: string,
    starred_url: string,
    subscriptions_url: string,
    organizations_url: string,
    repos_url: string,
    events_url: string,
    received_events_url: string,
    type: string,
    site_admin: boolean
  },
  html_url: string,
  description: string,
  fork?: boolean,
  url?: string,
  forks_url?: string,
  keys_url?: string,
  collaborators_url?: string,
  teams_url?: string,
  hooks_url?: string,
  issue_events_url?: string,
  events_url?: string,
  assignees_url?: string,
  branches_url?: string,
  tags_url?: string,
  blobs_url?: string,
  git_tags_url?: string,
  git_refs_url?: string,
  trees_url?: string,
  statuses_url?: string,
  languages_url?: string,
  stargazers_url?: string,
  contributors_url?: string,
  subscribers_url?: string,
  subscription_url?: string,
  commits_url?: string,
  git_commits_url?: string,
  comments_url?: string,
  issue_comment_url?: string,
  contents_url?: string,
  compare_url?: string,
  merges_url?: string,
  archive_url?: string,
  downloads_url?: string,
  issues_url?: string,
  pulls_url?: string,
  milestones_url?: string,
  notifications_url?: string,
  labels_url?: string,
  releases_url?: string,
  deployments_url?: string,
  created_at: string,
  updated_at?: string,
  pushed_at: string,
  git_url?: string,
  ssh_url?: string,
  clone_url?: string,
  svn_url?: string,
  homepage?: string,
  size?: number,
  stargazers_count?: number,
  watchers_count?: number,
  language: string,
  has_issues?: boolean,
  has_projects?: boolean,
  has_downloads?: boolean,
  has_wiki?: boolean,
  has_pages?: boolean,
  forks_count?: number,
  mirror_url?: string,
  archived?: boolean,
  disabled?: boolean,
  open_issues_count?: number,
  license?: string,
  allow_forking?: boolean,
  is_template?: boolean,
  topics?: [],
  visibility?: string,
  forks?: number,
  open_issues?: number,
  watchers?: number,
  default_branch?: string
}

interface ISearchHistory {
  user: IUser
  repos: IRepo[]
}

export const Home: React.FC = () => {
  const [user, setUser] = useState<IUser>(
    {
      login: "",
      id: 0,
      avatar_url: "",
      name: "",
      location: "",
      public_repos: 0,
      followers: 0
    }
  );
  const [repos, setRepos] = useState<IRepo[]>([]);
  const [searchHistory, setSearchHistory] = useState<ISearchHistory[]>([])
  const [userToSearch, setUserToSearch] = useState<String>("");
  const [isHistoryActive, setIsHistoryActive] = useState<Boolean>(false);
  const [handleSearchState, setHandleSearchState] = useState<Boolean>(false);

  async function searchUser() {
    await githubApi.get<IUser>(`https://api.github.com/users/${userToSearch}`)
      .then((response) => {
        setUser(response.data);
      })
      .catch(() => {
        setUser(
          {
            login: "",
            id: 0,
            avatar_url: "",
            name: "",
            location: "",
            public_repos: 0,
            followers: 0
          }
        );
        setRepos([]);
        setHandleSearchState(false);
      });

    await githubApi.get<IRepo[]>(`https://api.github.com/users/${userToSearch}/repos`)
      .then((response) => {
        setRepos(response.data);
        setHandleSearchState(true);
        setIsHistoryActive(false)

        setSearchHistory(user.id !== 0 ? [...searchHistory, {user, repos}] : [])
        console.log(searchHistory)
      })
  }

  function handleShowHistory() {
    isHistoryActive ? setIsHistoryActive(false) : setIsHistoryActive(true);

    setHandleSearchState(false);
  }

  return (
    <ScrollView style={{backgroundColor: '#6d43f7'}}>
      <Body>
        <Text style={{ fontWeight: "bold", fontSize: 30, marginTop: 140, marginBottom: 10 }}>HUBusca</Text>
        <View style={{ flex: 1, flexDirection: "row" }}>
        <TextInput 
          placeholder="GitHub username"
          onChangeText={setUserToSearch}
          onBlur={searchUser}
        />
          <ButtonContainer 
            onPress={handleShowHistory} 
            style={isHistoryActive ? {borderStyle: "solid", borderWidth: 2, borderColor: "#FFF", backgroundColor: "#000"} : {}}
          >
            <Icon name="history" size={30} style={isHistoryActive ? {color: "#FFF"} : {color: "#000"}} />
          </ButtonContainer>
        </View>

        <View style={{flex: 1, position: "relative"}}>
          { handleSearchState && <UserCard user={user} repos={repos} /> }
          { isHistoryActive && 
            searchHistory.map((searchHistory, index) => (
              <UserCard key={index} user={searchHistory.user} repos={searchHistory.repos} /> 
            ))
          }
        </View>
        
      </Body>
    </ScrollView>
  )
}