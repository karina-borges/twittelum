import { useState } from "react";

export default function FormNovoTweet( { addTweetCallback } ) {
    const [novoTweet, setNovoTweet] = useState('');
    const statusClass = novoTweet.length > 140 ? 'novoTweet__status--invalido' : '';
    const isDisabled = novoTweet.length > 140 || novoTweet.trim().length === 0;

    const handleFormSubmit = (e) => {
        e.preventDefault();
        addTweetCallback(novoTweet);
        setNovoTweet('');
    }

    return (
        <form className="novoTweet" onSubmit={handleFormSubmit}>
            <div className="novoTweet__editorArea">
                <span className={`novoTweet__status ${statusClass}`}>
                    { novoTweet.length }/140
                </span>
                <textarea 
                    className="novoTweet__editor" 
                    placeholder="O que está acontecendo?"
                    value={novoTweet}
                    onChange={(e) => setNovoTweet(e.target.value)}
                ></textarea>
            </div>
            <button type="submit" disabled={isDisabled} className="novoTweet__envia">Tweetar</button>
        </form>
    );
}