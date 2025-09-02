// 代码生成时间: 2025-09-03 07:08:37
const { useEffect, useState } = require('react');

// 使用 NEXT framework 的 getServerSideProps 或 getStaticProps 来初始化主题
// 这里使用 getServerSideProps 作为示例
const getServerSideProps = async (context) => {
  const theme = 'dark'; // 假设从数据库或环境变量中获取主题
  return {
    props: {
      initialTheme: theme,
    },
  };
};

// 主题切换组件
const ThemeSwitcher = ({ initialTheme }) => {
  const [theme, setTheme] = useState(initialTheme);

  const switchTheme = () => {
    // 切换主题到相反的主题
    setTheme(theme === 'dark' ? 'light' : 'dark');
    document.body.className = theme;
  };

  useEffect(() => {
    // 应用主题到页面
    document.body.className = theme;
  }, [theme]);

  return (
    <button onClick={switchTheme}>
      Switch to {theme === 'dark' ? 'Light' : 'Dark'} Theme
    </button>
  );
};

export default ThemeSwitcher;

// 导出 getServerSideProps 以便 NEXT 使用
export { getServerSideProps };
