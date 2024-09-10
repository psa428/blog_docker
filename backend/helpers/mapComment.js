module.exports = function (comment) {
    return {
        content:    comment.content,
        author: comment.author,
        id: comment._id,       
        publishedAt:  comment.createdAt
    }
}