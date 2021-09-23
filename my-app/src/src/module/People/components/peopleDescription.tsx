/* eslint-disable react-hooks/rules-of-hooks */
import React, { FC, useEffect } from "react";
import { useParams } from "react-router-dom";
import { peopleService } from "../../../service/api/people";
// import Loader from "../../../components/Loader";
import Description from "./Description";

const peopleDescription: FC = () => {
    const { id } = useParams<{ id: string }>();
    // const [loading, setLoading] = React.useState(false);
    const [people, setPeople] = React.useState({});

    const getPeople = async () => {
        // setLoading(true);
        const res = await peopleService.getPeople(id);
        setPeople(res);
        // setLoading(false);
    };

    useEffect(() => {
        getPeople();
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <div>
            {/* <Loader open={loading} /> */}
            <Description people={people}></Description>
        </div>
    )
};

export default peopleDescription