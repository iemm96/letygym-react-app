import React from 'react';
import { Button } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faTrash} from '@fortawesome/free-solid-svg-icons'

const ActionsFormatter = ({id}) => {
    return (
    <div>
        <Button type="Button" className="btn mr-2 btn-primary"><FontAwesomeIcon icon={faEdit}/></Button>
        <Button type="Button" className="btn btn-danger"><FontAwesomeIcon icon={faTrash}/></Button>
    </div>);

};

export default ActionsFormatter;