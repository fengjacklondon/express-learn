var conf = {
	mysql:{
			host	: '127.0.0.1',
 			port	: 4706,
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
	},
	article:{
		storePath: '/public/html/article',
		templatePath: '/public/template/article.pug',
		css: '2.css'
	}
};

module.exports = conf;
