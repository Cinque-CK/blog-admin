import * as React from 'react';

class Gallery extends React.Component {
    constructor(props: any) {
        super(props);
        this.state = {
            userList: []
        };
    }
    public render() {
        return (
            <div className="page--inner article-user--inner">
                <span/>
            </div>
        );
    }
}

export default Gallery;