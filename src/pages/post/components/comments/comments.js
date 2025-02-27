import PropTypes from 'prop-types';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectUserId, selectUserRole } from '../../../../selectors';
import { Icon } from '../../../../components';
import { addCommentAsync } from '../../../../action';
import { useServerRequest } from '../../../../hooks';
import { Comment } from '../comments';
import { PROP_TYPE, ROLE } from '../../../../constants';
import styled from 'styled-components';

const CommentsContainer = ({ className, comments, postId }) => {
	const [newComment, setNewComment] = useState('');
	const userId = useSelector(selectUserId);
	const userRole = useSelector(selectUserRole);
	const dispatch = useDispatch();
	const requestServer = useServerRequest();

	const onNewCommentAdd = (userId, postId, content) => {
		dispatch(addCommentAsync(requestServer, userId, postId, content));
		setNewComment('');
	};

	const isGuest = userRole === ROLE.GUEST;

	return (
		<div className={className}>
			{!isGuest && (
				<div className="new-comment">
					<textarea
						name="comment"
						value={newComment}
						placeholder="Комментарий..."
						onChange={({ target }) => setNewComment(target.value)}
					></textarea>
					<Icon
						id="fa-paper-plane-o"
						size="18px"
						margin="0 0 0 10px"
						onClick={() => onNewCommentAdd(userId, postId, newComment)}
					/>
				</div>
			)}
			<div className="comments"></div>
			{comments.map(({ id, author, content, publishedAt }) => (
				<Comment
					key={id}
					postId={postId}
					id={id}
					author={author}
					content={content}
					publishedAt={publishedAt}
				/>
			))}
		</div>
	);
};

export const Comments = styled(CommentsContainer)`
	margin: 20px auto;
	width: 580px;

	& .new-comment {
		display: flex;
		width: 100%;
		margin: 20px 0 0;
	}

	& .new-comment textarea {
		width: 550px;
		resize: none;
		height: 120px;
		font-size: 16px;
	}
`;

Comments.propTypes = {
	comments: PropTypes.arrayOf(PROP_TYPE.COMMENT).isRequired, 
	postId: PropTypes.string.isRequired,
};
