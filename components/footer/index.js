import React from 'react';
import styled from 'styled-components';
import tachyons from 'styled-components-tachyons';
import SocialIcons from '../shared/social-icons'
import MailchimpSubscribe from 'react-mailchimp-subscribe';

const mailchimpURL = process.env.MAILCHIMP || '';

const Div = styled.div`${tachyons}`;
const H2 = styled.h2`${tachyons}`;
const P = styled.p`${tachyons}`;
const A = styled.a`${tachyons}`;
const Form = styled.form`${tachyons}`;
const EmailInput = styled.input`
	&:focus {
		outline: 0;
		border-color: var(--gold);
		background-color: var(--light-yellow);
	}
${tachyons}`;
const SubmitButton = styled.button`
	&:focus, &:hover {
		border-color: var(--blue);
		color: var(--white);
		background-color: var(--blue);
		outline: 0;
	}
	&:active {
		border-color: var(--gold);
		background-color: var(--gold);
	}
${tachyons}`;
const Message = styled.div`
	a:link, a:visited {
		color: var(--blue)
	}
	a:hover {
		color: var(--light-blue)
	}
${tachyons}`;

const CustomForm = ({status, message, onValidated}) => {
	let email;
	const submit = () =>
		email &&
		onValidated({
			EMAIL: email.value
		});

	if (message && message.startsWith('0 - ')) {
		message = message.split('0 - ')[1];
	}

	return (
		<Form
			onSubmit={
				e => {
					e.preventDefault();
					submit();
				}
			}
		>
			<EmailInput
				ref={node => email = node}
				type="email"
				name="email"
				placeholder="your.name@email.com"
				input_reset ba bw1
				b__light_silver ph3
				pv2
				mb4 f5 f4 br_0_l
				fl w_100 w_70_ns
			/>
			<SubmitButton f4 bg_white fl w_100 w_30_ns ph3 pv2 mb4 center tc blue tracked ttl small_caps ba bw1 b__blue type="submit">
				Subscribe
			</SubmitButton>
			{status === 'sending' && <Message fl w_70 ph3 f6 lh_copy>sending...</Message>}
			{status === 'error' && (
				<Message fl w_70 red ph3 f6 lh_copy dangerouslySetInnerHTML={{__html: message}}/>
			)}
			{status === 'success' && (
				<Message fl w_70 ph3 f6 lh_copy dangerouslySetInnerHTML={{__html: message}}/>
			)}
		</Form>
	);
};

const Footer = () => {
	return (
		<Div fl w_100 bg_near_white mt4 className="cf">
			<Div pv3 mh6_l>
				<Div fl w_100 w_50_ns ph3 mb4>
					<H2 f3 mb2 fw6>About</H2>
					<P lh_copy measure dark_gray>DotWatcher is here to showcase the best of long distance self-supported bike racing. The DotWatcher Digest is a regular roundup of the best content from around the bikepacking webosphere, delivered via an exclusive newsletter.</P>
					<MailchimpSubscribe
						url={mailchimpURL}
						render={({ subscribe, status, message }) => (
							<CustomForm
								status={status}
								message={message}
								onValidated={formData => subscribe(formData)}
								url={mailchimpURL}
							/>
						)}
					/>
				</Div>
				<Div fr w_100 w_25_ns ph3 mb4>
					<H2 f3 mb2 fw6>Contact</H2>
					<P lh_copy measure_narrow dark_gray>If you have a race you would like us to cover or just want to get in touch email us at <A link near_black underline hover_blue href="mailto:info@dotwatcher.cc">info@dotwatcher.cc</A></P>
					<SocialIcons size="2" colour="near-black" />
				</Div>
			</Div>
		</Div>
	);
};

export default Footer;
