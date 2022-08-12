import React from "react";
import Router from "next/router";

const authenticatedRoute = (Component = null, options = {}) => {
  class AuthenticatedRoute extends React.Component {
		state = {
		  loading: true,
		};

		componentDidMount() {
			if (this.props.isLoggedIn) {
				this.setState({ loading: false });
			} else {
				Router.push(options.pathAfterFailure || "/member/signin");
			}
		}

		render() {
			const { loading } = this.state;

			if (loading) {
				return <div />;
			}

			return <Component {...this.props} />;
		}
	}
	return AuthenticatedRoute;
};

export default authenticatedRoute;