import React from 'react';
import { Button, Row, Col } from 'reactstrap';
import './styles/style.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck, faTrash} from '@fortawesome/free-solid-svg-icons'

 export default class ListaResultados extends React.Component {

     constructor(props) {
         super(props);
         this.state = {
             list: props.list,
             isHovering: false,
             actualHovering: null,
         };
     }

     handleMouseHover = index => {

         if(this.props.hoverEnable) {
             this.setState({actualHovering: index});
         }
         return (this.setState(this.toogleHoverState));
     };

     toogleHoverState = state => {

         return {isHovering: !state.isHovering}};

     render() {

         let buffer = [];
         if(this.props.list.length >= 1) {
             this.props.list.map((result, index) => {
                 buffer.push(
                     <li id={index}
                         onMouseEnter={() => this.handleMouseHover(index)}
                         onMouseLeave={() => this.handleMouseHover(index)}
                         className="list-group-item">
                     <Row className="">
                         <Col className="">
                            <span className="">{result}</span>
                        </Col>
                         <Col className="align-self-end">
                             {this.state.actualHovering === index &&
                             <Button
                                 className={`actionButton`}
                                 onClick={() => this.props.checarAsistencia(this.props.arrayIdSocios[index])}
                                 disabled={this.props.isDisabled}>
                                 <span className={`${this.props.isLoading ? 'spinner-border spinner-border-sm' : ''}`}></span>
                                 {this.props.isCorrect === true ? <FontAwesomeIcon icon={faCheck}/> : ''}{ this.props.buttonText}
                             </Button>}
                         </Col>
                     </Row>
                 </li>);
             });
         }

         return buffer;

    }

}
