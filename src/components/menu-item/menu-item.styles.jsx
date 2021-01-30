import styled from "styled-components";

export const BackgroundImage = styled.div`
	background-position: center;
	background-size: cover;
	height: 100%;
	width: 100%;
	background-image: ${({ imageUrl }) => `url(${imageUrl})`};
`;

export const Content = styled.div`
	height: 90px;
	padding: 0 25px;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	background-color: white;
	opacity: 0.7;
	position: absolute;
`;

export const MenuItemContainer = styled.div`
	min-width: 30%;
	height: ${({ size }) => (size ? '380px' : '240px')};
	flex: 1 1 auto;
	display: flex;
	align-items: center;
	justify-content: center;
	margin: 0 7.5px 15px;
	overflow: hidden;

	&:first-child {
		margin-right: 7.5px;
	}

	&:last-child {
		margin-left: 7.5px;
	}

	&:hover {
		cursor: pointer;

		& ${BackgroundImage} {
			transform: scale(1.1);
			transition: transform 6s cubic-bezier(0.25, 0.45, 0.45, 0.95);
		}

		& ${Content} {
			opacity: 0.9;
		}
	}
`;

export const Title = styled.h1`
	font-weight: bold;
	margin-bottom: 6px;
	font-size: 22px;
	color: #4a4a4a;
`;

export const Subtitle = styled.span`
	font-weight: lighter;
	font-size: 16px;
	margin-bottom: 8px;
`;