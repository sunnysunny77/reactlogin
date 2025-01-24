import React from "react";
import Accordion from 'react-bootstrap/Accordion';

const AccordianHeading = (props) => {

  const { content } = props;

  return (

    <>

      <div className="accordian-heading"> 

        <Accordion defaultActiveKey={0}>

          {content.map((index, i) => { 

              const { heading, body } = index; 
              
              return (

                <Accordion.Item key={i} eventKey={i} >

                  <Accordion.Header>
                                
                    { heading }

                  </Accordion.Header>

                  <Accordion.Body>

                    <ul>

                      {body.map((index, i) => { 
                        
                        return (

                          <li key={i} className="mb-3">

                            { index }

                          </li>
                        );
                      })}

                    </ul>

                  </Accordion.Body>

                </Accordion.Item>

              );

          })}

        </Accordion>

      </div>

    </>
    
  );
};

export default AccordianHeading;