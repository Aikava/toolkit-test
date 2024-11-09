import * as React from "react";
import {useParams} from "react-router";
import {useEffect, useMemo} from "react";
import {Page} from "../../components";
import "./style.css";
import {useSearchParams} from "react-router-dom";
import {$repositoryDetails, fetchRepositoryDetailsFx} from "../../store";
import {useUnit} from "effector-react/compat";

export const DetailsPage = () => {
    const { repoId } = useParams();
    const [searchParams] = useSearchParams();
    const details = useUnit($repositoryDetails);

    useEffect(() => {
        void fetchRepositoryDetailsFx({
            repositoryName: repoId,
            owner: searchParams.get("owner")
        });
    }, []);
    const formattedDate = useMemo(() => details &&
        details.lastCommitDate &&
        new Date(details.lastCommitDate).toDateString(), [details]);
    const isLoading = useUnit(fetchRepositoryDetailsFx.pending);

    return (<Page title="Details">
        <div className="details__container">
            {details && !isLoading ? (
                <>
                <section className="owner-section">
                    <img className="owner-section__avatar" src={details.owner.avatarUrl}></img>
                </section>
                <section className="repository-section">
                <h1 className="repository-section__title">{details.name}</h1>
                    <div className="repository-section__sub-title">
                        <div>Last update: {formattedDate}</div>
                        <div className="repository-section__stargazer">
                            Stars: {details.stargazer}
                        </div>
                        <div>Owner: <a href={`https://github.com/${details.owner.login}`}
                                       className="owner-section__name">{details.owner.login}</a>
                        </div>
                    </div>
                    <p className="repository-section__description">
                    {details.description}
                    </p>
                    { details.languages.length > 0 &&
                    <div className="repository-section__languages">
                        <b>Languages:</b><br/>
                        {details.languages.map(language => (<div className="repository-section__language" key={language}>{language}</div>))}
                    </div> }
                </section>
                </>
            ) : "Loading..."}
        </div>
    </Page>);
}