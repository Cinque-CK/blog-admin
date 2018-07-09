import * as classnames from 'classnames';
import * as React from 'react';
import { setToken } from '../utils/lsUtil';
import './Login.css';
interface IHomeRouterProps {
    history: any;
}
class Login extends React.Component<IHomeRouterProps> {
    constructor(props: IHomeRouterProps) {
        super(props);
        this.state = {
            userName: '',
            password: '',
            showForm: true
        };
    }
    public render() {
        const state: any = this.state;
        return (
            <div className="page login-page">
                <div className={classnames('form-wrap', { vanished: !state.showForm })}>
                    <div className="form-item input">
                        <span>Username:</span>
                        <input value={state.userName} onChange={this.onInputChange.bind(this, 'userName')} />
                    </div>
                    <div className="form-item input">
                        <span>Password:</span>
                        <input value={state.password} type="password" onChange={this.onInputChange.bind(this, 'password')} />
                    </div>
                    <div className="form-item button">
                        {' '}
                        ——— <button onClick={this.onLoginClick}>LOGIN</button> ———
                    </div>
                </div>
            </div>
        );
    }

    private onInputChange = (fieldName: string, e: React.ChangeEvent<HTMLInputElement>): void => {
        this.setState({
            [fieldName]: e.target.value
        });
    };

    private onLoginClick = (): void => {
        setToken('12345');
        this.setState({
            showForm: false
        });
        setTimeout(() => {
            this.props.history.push('/main');
        }, 300);
    };
}

export default Login;
