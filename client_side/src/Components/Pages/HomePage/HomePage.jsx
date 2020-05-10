import React, { useState } from 'react';
import { Row, Col } from 'react-bootstrap';
import SelectBox from '../../SmallComponents/SelectBox/SelectBox';
import Input from '../../SmallComponents/Input/Input';
import './HomePage.css';
import RecipeCard from '../../SmallComponents/RecipeCard/RecipeCard';

function HomePage() {

    const [selectedOption, setSelectedOption] = useState({ Diets: '', Cuisines: '', Intolerances: '', exclude: '', include: '' });
    const [cards, setCards] = useState([]);

    const handleChange = (e) => {
        setSelectedOption({
            ...selectedOption,
            [e.target.name]: e.target.value
        })
    }

    const handleClick = (e) => {

        setCards(() => [])
        let url = 'https://api-recipe-react-nodejs.herokuapp.com/api/recipes?';
        const { Diets, Cuisines, Intolerances, exclude, include } = selectedOption;
        if (Diets !== '') url += url[url.length - 1] === '?' ? `diet=${Diets}` : `&diet=${Diets}`;
        if (Cuisines !== '') url += url[url.length - 1] === '?' ? `cuisine=${Cuisines}` : `&cuisine=${Cuisines}`;
        if (Intolerances !== '') url += url[url.length - 1] === '?' ? `intolerances=${Intolerances}` : `&intolerances=${Intolerances}`;
        if (exclude !== '') url += url[url.length - 1] === '?' ? `excludeIngredients=${exclude}` : `&excludeIngredients=${exclude}`;
        if (include !== '') url += url[url.length - 1] === '?' ? `query=${include}` : `&query=${include}`;
        fetch(url).then(response => {
            if (response.status === 500) alert("error");
            else return response.json();
        }).then((result) => {
            console.log(result.result.results);
            setCards((oldArray) => [...oldArray, ...result.result.results])


        })


    }

    return (
        <div className="homePage">
            <Row className="header d-flex justify-content-center">
                Recipe Finder
            </Row>
            <Row className="sub-header d-flex justify-content-center">
                Find today's dish in the fastest way
            </Row>
            <Row>
                <Col className="selectBox" md={3}><SelectBox id="Diets" label="pick your diet" value={selectedOption.Diets} onChange={handleChange} /></Col>
                <Col className="selectBox" md={3}><SelectBox id="Cuisines" label="pick your cuisine" value={selectedOption.Cuisines} onChange={handleChange} /></Col>
                <Col className="selectBox" md={3}><SelectBox id="Intolerances" label="pick your intolerances" value={selectedOption.Intolerances} onChange={handleChange} /></Col>
                <Col className="selectBox" md={3}><Input id="exclude" label="exclude ingridians" value={selectedOption.exclude} onChange={handleChange} /></Col>
                <Col className="selectBox" md={3}><Input id="include" label="include ingridians" value={selectedOption.include} onChange={handleChange} /></Col>
            </Row>
            <Row className="btnSearchRow d-flex justify-content-center">
                <button onClick={handleClick} className="btn btn-warning">Start Search</button>
            </Row>
            <Row className="d-flex justify-content-center">
                {cards !== [] ? cards.map((recipe, key) =>
                    <RecipeCard
                        key={key}
                        id={recipe.id}
                        image={recipe.image}
                        title={recipe.title}
                        readyInMinutes={recipe.readyInMinutes}
                        sourceUrl={recipe.sourceUrl}
                        serving={recipe.servings}
                    />
                ) : null
                }

            </Row>
        </div>
    );
}

export default HomePage;