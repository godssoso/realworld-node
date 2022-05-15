/**
 * 处理文章模块
 */
const { Article, User } = require("../model");

//创建文章
exports.addArticle = async (req, res, next) => {
  try {
    //通过所有验证后  将文章保存到数据库中
    const article = new Article(req.body.article);

    article.author = req.user._id; // 在token认证时已经将user对象挂载到req对象上了  这里可以直接获取用户信息

    await article.populate("author"); //数据库中author字段存的还是用户id，这里通过populate方法从用户表中映射出用户对象

    await article.save();

    res.status(201).json({
      message: "创建成功",
      article,
    });
  } catch (error) {
    next(error);
  }
};

//获取文章信息（通过文章id）
exports.getArticle = async (req, res, next) => {
  try {
    const article = await Article.findById(req.params.articleId).populate(
      "author"
    );
    if (!article) {
      return res.status(404).json({
        error: "文章不存在",
      });
    }
    res.status(200).json({
      article,
    });
  } catch (error) {
    next(error);
  }
};

//查询文章列表（根据条件）
exports.queryArticles = async (req, res, next) => {
  try {
    // 从 req.query中解构出查询条件
    const {
      limit = 20, //默认最多查20条
      offset,
      tag,
      author,
    } = req.query;
    const filter = {}; //查询条件
    if (tag) {
      filter.tagList = tag; //数据模型中tagList 为数组，这里是只要tagList中包含tag就会被查到
    }
    if (author) {
      //先从用户表中查询该author对应的id  然后根据id查询Article表中author值为该id的数据
      const user = await User.findOne({ userName: author });
      const authorId = user ? user._id : null;
      filter.author = authorId;
    }
    const articles = await Article.find(filter)
      .skip(Number(offset)) //跳过多少条
      .limit(Number(limit)) //查询多少条
      .sort({
        // -1:倒叙   1:正序
        createdAt: -1,
      });
    const total = await Article.countDocuments();

    res.status(200).json({
      articles,
      total,
    });
  } catch (error) {
    next(error);
  }
};

//更新某篇文章（通过文章id）
exports.updateArticle = async (req, res, next) => {
  try {
    //之前的校验已经将查找到的article挂载到req对象上了   这里只需直接更新并保存
    const { title, body, description, tagList } = req.body;
    //可以对用户未传任何修改项的情况进行判断
    if (!title && !body && !description && !tagList) {
      return res.status(400).json({
        message: "未传递要更新的内容",
      });
    }
    req.article.title = title ? title : req.article.title;
    req.article.body = body ? body : req.article.body;
    req.article.description = description
      ? description
      : req.article.description;
    req.article.tagList = tagList ? tagList : req.article.tagList;
    await req.article.save();
    res.status(202).json({
      message: "更新成功",
    });
  } catch (error) {
    next(error);
  }
};

//删除某篇文章（通过文章id）
exports.deleteArticle = async (req, res, next) => {
  try {
    const article = req.article;
    await article.remove();
    res.status(203).json({
      message: "删除成功",
    });
  } catch (error) {
    next(error);
  }
};
