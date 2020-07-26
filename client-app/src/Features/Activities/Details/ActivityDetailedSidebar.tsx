import React, { Fragment } from 'react'
import { Segment, List, Item, Label, Image } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import { observer } from 'mobx-react-lite'
import { IAttendee } from '../../../App/Models/Activity'

interface IProps {
    attendees: IAttendee[]
}

const ActivityDetailedSidebar: React.FC<IProps> = ({attendees}) => {
    const isHost = false;
    return (
        <Fragment>
            <Segment
            textAlign='center'
            style={{ border: 'none' }}
            attached='top'
            secondary
            inverted
            color='teal'
            >
            {attendees.length} {attendees.length === 1 ? "Person" : "People"} Going
            </Segment>
            <Segment attached>
            <List relaxed divided>
                {attendees.map(attendee => (
                    <Item key={attendee.username} style={{ position: 'relative' }}>
                    {isHost && 
                    <Label
                        style={{ position: 'absolute' }}
                        color='orange'
                        ribbon='right'
                    >
                        Host
                    </Label>}
                    <Image size='tiny' src={attendee.image || '/items/user.png'} />
                    <Item.Content verticalAlign='middle'>
                        <Item.Header as='h3'>
                        <Link to={`/profile/${attendee.displayName}`}>{attendee.displayName}</Link>
                        </Item.Header>
                        <Item.Extra style={{ color: 'orange' }}>Following</Item.Extra>
                    </Item.Content>
                    </Item>
                ))}
                </List>
            </Segment>
      </Fragment>  
    )
}

export default observer(ActivityDetailedSidebar);
