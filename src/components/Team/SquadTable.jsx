import React from "react";
import "./SquadTable.css";
export default function SquadTable(props)
{
    
    function getPlayerAge(birthDate)
    {
        let today = new Date();
        let birth = new Date(birthDate);
        let age = today.getFullYear() - birth.getFullYear();
        let m = today.getMonth() - birth.getMonth();
        if(m < 0 || (m === 0 && today.getDate() < birth.getDate()))
        {
            age--;
        }
        return age;
    }
    function toUpper(str)
    {
        return str.charAt(0).toUpperCase() + props.type.slice(1);
    }
           
    return(
        <div className="squad-table">
           
           <div className="squad-container">
            <div className="squad-header">
                <div className="squad-header-col-position">{toUpper(props.type)}</div>
            </div>
            <div className="squad-body">
                {
                    <table className="table table-dark table-striped">
                        <thead>
                            <tr className="squad-header-row">
                                <th className="squad-col-name">
                                    Name
                                </th>
                                <th className="squad-col-age">
                                    Age
                                </th>
                                <th className="squad-col-nationality"> 
                                Nationality
                                </th>
                            </tr>
                        </thead> 
                        <tbody className="sqsuad-table-body">
                        {props.squad[props.type].map((player) => (
                        
                            <tr className="squad-table-row" key={player.id}>    
                                <td className="squad-table-data-name">{player.name}</td>
                                <td className="squad-table-data-age">{getPlayerAge(player.dateOfBirth)}</td>
                                <td className="squad-table-data-nationality">{player.nationality}</td>
                            </tr>
                        ))} 

                        </tbody>   
                    </table>
                
             
                }
                
                

            </div>
            </div>
        </div>
    )
}