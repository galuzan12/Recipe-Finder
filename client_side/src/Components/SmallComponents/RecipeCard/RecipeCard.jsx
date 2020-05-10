import React from 'react';
import { Row, Col } from 'react-bootstrap';
import './RecipeCard.css';

function RecipeCard({ id, title, readyInMinutes, image, sourceUrl, serving }) {
    return (
        <Col className="recipeCard" md={3}>
            <input type="hidden" name="id" value={id} />
            <h1 className="recipeTitle">{title}</h1>
            <p>ready in minutes: {readyInMinutes}</p>
            <p>serving: {serving}</p>
            <img className="recipeImg" src={`https://spoonacular.com/recipeImages/${image}`} alt={title} />
            <a href={sourceUrl} ><button className="btnToRecipe btn-block btn btn-warning">To recipe</button></a>
        </Col>
    );
}
export default RecipeCard;