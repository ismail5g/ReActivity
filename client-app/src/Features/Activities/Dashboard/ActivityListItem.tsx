import React from 'react'
import { Item, Button, Segment, Icon, Label} from 'semantic-ui-react'
import { Link } from 'react-router-dom';
import { IActivity } from '../../../App/Models/Activity';
import {format} from 'date-fns';
import ActivityListItemAttendees from './ActivityListItemAttendees';

const ActivityListItem: React.FC<{activity: IActivity}> = ({activity}) => {
    const host = activity.Attendees.filter(a=> a.isHost)[0];
    // console.log("Host ", host);
    return (
        <Segment.Group>
            <Segment>
                <Item.Group>
                    <Item>
                        <Item.Image 
                            size='tiny' 
                            circular src={host.image || '/items/user.png'}
                            style={{ marginBottom: 3 }}
                        />
                        <Item.Content>
                            <Item.Header as={Link} to={`/activities/${activity.id}`}>{activity.title}</Item.Header>
                            <Item.Description>
                                Hosted by 
                                <Link to={`/profile/${host.username}`}> {host.displayName}</Link>
                            </Item.Description>
                            {activity.isHost && 
                            <Item.Description>
                                <Label 
                                    basic 
                                    color='orange' 
                                    content='You are Hosting this Activity'
                                />
                            </Item.Description>}
                            {activity.isGoing && !activity.isHost &&
                            <Item.Description>
                                <Label 
                                    basic 
                                    color='green' 
                                    content='You are Going to this Activity'
                                />
                            </Item.Description>}
                        </Item.Content>
                    </Item>
                </Item.Group>
            </Segment>
            <Segment>
                <Icon name='clock' />{format(activity.date, 'h:mm a')}
                <Icon name='marker' />{activity.venue},{activity.city}
            </Segment>
            <Segment secondary>
                <ActivityListItemAttendees attendees={activity.Attendees}/>
            </Segment>
            <Segment clearing>
                <span>{activity.description}</span>
                <Button 
                    as={Link} to={`/activities/${activity.id}`}
                    floated='right' 
                    content='View' 
                    color='blue' 
                />
            </Segment>
        </Segment.Group>
    )
}

export default ActivityListItem
