
function ImageOpen(props) {

    return (
        <div className="imageOpenContent">
            <div className="imageOpenContainer">
                <div>
                    <img src={props.photo} className='imageOpenImage' />
                </div>
                <div className="imageOpenClose" onClick={() => props.selectedPhoto('')}>X</div>
            </div>
        </div>
    );
}

export default ImageOpen;