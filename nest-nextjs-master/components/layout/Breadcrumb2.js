import React from "react";
import { useRouter } from 'next/router'

const Breadcrumb2 = ({levels, title, description}) => {

    console.log(levels)
    const router = useRouter()

    const titlex = router.query.cat
    
    return (
            <div className="page-header mt-30 mb-50">
                <div className="container">
                    <div className="archive-header">
                        <div className="row align-items-center">
                            <div className="col-xl-3">
                                <h1 className="mb-15 text-capitalize">{title}</h1>
                                {levels&&
                                <div className="breadcrumb">
                                    {levels.map((val,index)=>{
                                        return index == levels.length-1 || index == 0 ? <div key={val}>{val}  </div> : <div key={[val]}>{val} <span></span> {titlex}</div>
                                    }
                                    )}
                                </div>}
                            </div>
                            {description&&description!=="NULL"&&
                            <p dangerouslySetInnerHTML={{__html: description}}></p>}
                        </div>
                    </div>
                </div>
        </div>
    );
};

export default Breadcrumb2;
