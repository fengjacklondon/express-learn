var conf = {
	mysql:{
			host	: '127.0.0.1',
 			port	: 3306,
			user	: 'root',
			password: 'Wewechat',
			database: 'db_blog',
			tables: {
				TABLE_ARTICLE:'tb_article',
				TABLE_FEATURE:'tb_feature',
				TABLE_USER:'tb_user',
				TABLE_DISCUSS:'tb_discuss',
				TABLE_VISITOR:'tb_visitor'
			}
	}
};

module.exports = conf;
