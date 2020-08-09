import React, {useEffect, useState} from 'react';
import { Button, Row, Col } from 'reactstrap';
import './styles/style.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck, faTrash} from '@fortawesome/free-solid-svg-icons'

const ListaResultados = props => {

    const [actualHovering,setActualHovering] = useState(false);
    const [isHovering,setIsHovering] = useState(false);
    const [buffer,setBuffer] = useState([]);
    const [list,setList] = useState([]);

    useEffect(() => {
        setList(props.list);

            setBuffer([]);
            list.map((result, index) => {
                buffer.push(
                    <li id={index}
                        onMouseEnter={() => handleMouseHover(index)}
                        onMouseLeave={() => handleMouseHover(index)}
                        className="list-group-item"
                    >
                        <Row className="">
                            <Col className="">
                                <span className="">{result.nombre}</span>
                            </Col>
                            <Col className="align-self-end">
                                {actualHovering === index &&
                                <Button
                                    className={`actionButton`}
                                    onClick={() => props.checarAsistencia(props.result.id)}
                                    disabled={props.isDisabled}>
                                    <span className={`${props.isLoading ? 'spinner-border spinner-border-sm' : ''}`}></span>
                                    {props.isCorrect === true ? <FontAwesomeIcon icon={faCheck}/> : ''}{ props.buttonText}
                                </Button>}
                            </Col>
                        </Row>
                    </li>);
            });
    },[])

    const handleMouseHover = index => {

        if(props.hoverEnable) {
            setActualHovering(index);
        }

        setIsHovering(!isHovering);

        return isHovering;

    };



    return buffer;
};

export default ListaResultados;


