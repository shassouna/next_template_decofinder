import React from "react";
import { useRouter } from 'next/router'


// global functions 
function cleanHTML(str)
{
   if ((str===null) || (str===''))
   {
   return false;
   }
   else
   {
   str = str.toString();
   return str.replace(/<[^>]*>/g, '');
   }
}

const Breadcrumb2 = ({levels, title, description}) => {
    const router = useRouter()

    const titlex = router.query.cat
    return (
            <div className="page-header mt-30 mb-50">
                <div className="container">
                    <div className="archive-header">
                        <div className="row align-items-center">
                            <div className="col-xl-3">
                                <h1 className="mb-15 text-capitalize">{titlex ? titlex : title}</h1>
                                <div className="breadcrumb">
                                    {levels.map((val,index)=>{
                                        return index == levels.length-1 ? <div>{val}  </div> : <div key={[val]}>{val} <span></span> {titlex}</div>
                                    }
                                    )}
                                </div>
                            </div>
                            {description&&
                            <p>{cleanHTML(description)}</p>}
                        </div>
                    </div>
                </div>
        </div>
    );
};

export default Breadcrumb2;
