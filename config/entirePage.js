const HtmlWebpackPlugin = require('html-webpack-plugin')
const config =  require('./index')
module.exports = {
  entry: {
    app: './src/main.js',
    policy:'./src/policy.js',
    conditions: './src/conditions.js',
    blog: './src/blog.js',
    blogDetail: './src/blogDetail.js',
    chargePolicy: './src/chargePolicy.js',
    introduction: './src/introduction.js'
  },
  devHtmlWebpackPlugin: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'index.html',
      inject: 'head',
      chunks:['app']
    }),
    new HtmlWebpackPlugin({
      filename: 'policy.html',
      template: 'policy.html',
      inject: true,
      chunks:['policy']
    }),
    new HtmlWebpackPlugin({
      filename: 'conditions.html',
      template: 'conditions.html',
      inject: true,
      chunks:['conditions']
    }),
    new HtmlWebpackPlugin({
      filename: 'blog.html',
      template: 'blog.html',
      inject: true,
      chunks:['blog']
    }),
    new HtmlWebpackPlugin({
      filename: 'blogDetail.html',
      template: 'blogDetail.html',
      inject: true,
      chunks:['blogDetail']
    }),
    new HtmlWebpackPlugin({
      filename: 'chargePolicy.html',
      template: 'chargePolicy.html',
      inject: true,
      chunks:['chargePolicy']
    }),
    new HtmlWebpackPlugin({
      filename: 'introduction.html',
      template: 'introduction.html',
      inject: true,
      chunks:['introduction']
    })
  ],
  proHtmlWebpackPlugin: [
    new HtmlWebpackPlugin({
      filename: config.build.index,
      template: 'index.html',
      inject: 'head',
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true
        // more options:
        // https://github.com/kangax/html-minifier#options-quick-reference
      },
      // necessary to consistently work with multiple chunks via CommonsChunkPlugin
      chunksSortMode: 'dependency',
      chunks: ['manifest','vendor','app']//需要引入的Chunk，不配置就会引入所有页面的资源
    }),
    new HtmlWebpackPlugin({
      filename: config.build.policy,
      template: 'policy.html',
      inject: true,
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true
        // more options:
        // https://github.com/kangax/html-minifier#options-quick-reference
      },
      // necessary to consistently work with multiple chunks via CommonsChunkPlugin
      chunksSortMode: 'dependency',
      chunks: ['manifest','vendor','policy']//需要引入的Chunk，不配置就会引入所有页面的资源
    }),
    new HtmlWebpackPlugin({
      filename: config.build.conditions,
      template: 'conditions.html',
      inject: true,
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true
      },
      chunksSortMode: 'dependency',
      chunks: ['manifest','vendor','conditions']
    }),
    new HtmlWebpackPlugin({
      filename: config.build.blog,
      template: 'blog.html',
      inject: true,
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true
        // more options:
        // https://github.com/kangax/html-minifier#options-quick-reference
      },
      // necessary to consistently work with multiple chunks via CommonsChunkPlugin
      chunksSortMode: 'dependency',
      chunks: ['manifest','vendor','blog']//需要引入的Chunk，不配置就会引入所有页面的资源
    }),
    new HtmlWebpackPlugin({
      filename: config.build.blogDetail,
      template: 'blogDetail.html',
      inject: true,
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true
      },
      chunksSortMode: 'dependency',
      chunks: ['manifest','vendor','blogDetail']
    }),
    new HtmlWebpackPlugin({
      filename: config.build.chargePolicy,
      template: 'chargePolicy.html',
      inject: true,
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true
      },
      chunksSortMode: 'dependency',
      chunks: ['manifest','vendor','chargePolicy']
    }),
    new HtmlWebpackPlugin({
      filename: config.build.introduction,
      template: 'introduction.html',
      inject: true,
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true
      },
      chunksSortMode: 'dependency',
      chunks: ['manifest','vendor','introduction']
    })
  ]
};
