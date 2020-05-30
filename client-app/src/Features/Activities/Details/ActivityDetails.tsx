import React, { useContext } from 'react'
import { Card, Image, Button } from 'semantic-ui-react'
import { IActivity } from '../../../App/Models/Activity'
import ActivityStore from '../../../App/Stores/ActivityStore';
import {observer} from 'mobx-react-lite';

interface IProps{
    setEditmode: (editmode: boolean) => void;
    setSelectedActivity: (activity: IActivity | null) => void;
}

const ActivityDetails: React.FC<IProps> = ({setEditmode, setSelectedActivity}) => {
    const activityStore = useContext(ActivityStore);
    const {selectedActivity: activity} = activityStore;
    return (
        <Card fluid>
            <Image src={`/items/categoryImages/${activity!.category}.jpg`} wrapped ui={false} />
            <Card.Content>
                <Card.Header>{activity!.title}</Card.Header>
                <Card.Meta>
                    <span>{activity!.date}</span>
                </Card.Meta>
                <Card.Description>
                    {activity!.description}
                </Card.Description>
            </Card.Content>
            <Card.Content extra>
                <Button.Group widths={2}>
                    <Button onClick={() => setEditmode(true)} color='blue' content='Edit' basic />
                    <Button onClick={() => setSelectedActivity(null)} content='Cancel' basic color='grey'/>
                </Button.Group>
            </Card.Content>
        </Card>
    )
}

export default observer(ActivityDetails);
