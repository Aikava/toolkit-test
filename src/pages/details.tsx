import * as React from "react";
import {useParams} from "react-router";

export const DetailsPage = () => {
    const { repoId } = useParams();

    return (<section>
        Repository details<br />
        repo id = {repoId}
    </section>);
}