import React from "react"
import  Icon  from 'react-native-vector-icons/Ionicons'
import { Divider, Interaction, PostText, PostTime, UserImg, UserInfo, UserInfoText, UserName, InteractionWrapper, InteractionText, Card, PostImg } from "../styles/FeedStyles"


const PostCard = ({item}: {item: any}) => {

    const likeIcon = item.liked ? 'happy' : 'happy-outline';
    const likeIconColor= item.liked ? '#e264e5' : '#333';
    
    
   
  if (item.likes == 1) {
    var likeText = '1 godt indtryk';
  } else if (item.likes > 1) {
   var likeText = item.likes + ' gode indtryk';
  } else {
    var likeText = '';
  }
    
    
    if(item.comments == 1) {
         var commentText = '1 Kommentar';
    } else if (item.likes > 1) {
         var commentText = item.comments + 'komentarer'
    } else {
        var commentText = '0 kommentar'
    }

    return(
        <Card>
        <UserInfo>
            <UserImg source={item.userImg} />
            <UserInfoText>
                <UserName> {item.UserName}</UserName>
                <PostTime> {item.postTime} </PostTime>
            </UserInfoText>
        </UserInfo>
        <PostText>{item.post}  </PostText>
        {item.postImg !==  'none' ? <PostImg source={item.postImg} /> : <Divider />} 
        <Divider />
        <InteractionWrapper>
            <Interaction active={item.liked}>
                <Icon name={likeIcon} size={25} color={likeIconColor} />
                <InteractionText active={item.liked}>{likeText} </InteractionText> 
            </Interaction>
            <Interaction active>
                <Icon name="chatbubble-outline" size={25} />
                <InteractionText > {commentText} </InteractionText> 
            </Interaction>
        </InteractionWrapper>
    </Card>
    );
};

export default PostCard;