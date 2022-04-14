const fs = require("fs");
const path = require("path");
const yargs = require("yargs");
const prettier = require("prettier");
const prettierrc = require("../../.prettierrc");
prettierrc["parser"] = "babel-ts";

const fileRule = /^[a-zA-Z0-9_]+_\d+\.svg$/;
const groupedFileRule = /^([a-zA-Z0-9_]+)_(\d+)\.(svg)$/;

const argv = yargs
  .locale("en")
  .usage("Usage: yarn icon:{command} [{iconName1} {iconName2} ...]")
  .alias("s", "save")
  .nargs("s", 1)
  .describe("s", "アイコンコンポーネントを配置するディレクトリ")
  .alias("i", "iconName")
  .describe("i", "変換するアイコン名.複数指定可能")
  .array("i")
  .alias("h", "help")
  .example(
    "yarn icon:importAll",
    "public下のアイコンを全てコンポーネント化してsrc/components/icons/に配置"
  )
  .example(
    "yarn icon:import hogeIcon1 hogeIcon2",
    "public下のhogeIcon1_{size}.svgとhogeIcon2_{size}.svgをコンポーネント化してsrc/components/icons/に配置"
  )
  .help()
  .demandOption(["s"])
  .strict().argv;

const main = async () => {
  // 引数チェック
  if (process.argv.length < 3) {
    console.log("引数が不足しています。");
    return;
  }

  const srcDir = path.join("public/icons/");
  const targetDir = path.join(argv.save + "/");
  const isIndividualImporting = !!argv.iconName;
  const convertedIcons = argv.iconName;

  // 入力チェック
  if (!fs.existsSync(srcDir)) {
    console.log(`source directory : ${srcDir}というフォルダは存在しません。`);
    return;
  }
  if (!fs.existsSync(targetDir)) {
    console.log(
      `target directory : ${targetDir}というフォルダは存在しません。`
    );
    return;
  }

  // public/icons下のアイコン情報をまとめる
  const icons = await getIconInfo(srcDir);

  // 個別にアイコンをインポートする場合
  if (isIndividualImporting) {
    if (convertedIcons.length == 0) {
      console.log("１つ以上のアイコンを指定してください");
      return;
    }
    // 指定されたアイコンをコンポーネント化して保存
    convertedIcons.forEach((iconName) => {
      createAIconComponentWithSaving(icons, targetDir, iconName, true);
    });
  }
  // 全アイコンをインポートする場合
  else {
    // 全てのアイコンをコンポーネント化して保存
    createIconComponentsWithSaving(icons, targetDir);
  }

  // コンポーネントディレクトリに存在するアイコン情報を取得
  const iconComponentFiles = await getIconComponentInfo(targetDir);

  // indexを更新
  createIconIndexWithSaving(iconComponentFiles, targetDir);
};

/**
 * srcDir下のアイコン情報をまとめる
 * @param {string} srcDir アイコンが存在するディレクトリ
 * @returns アイコン情報
 */
const getIconInfo = async (srcDir) => {
  // public/iconsのファイル一覧取得
  const files = await new Promise((resolve, reject) => {
    fs.readdir(srcDir, (err, files) => {
      if (err) return reject(err);
      else return resolve(files);
    });
  });

  // public/iconsのファイル一覧からiconName_size.svgの規則を満たしたsvgファイルを取得
  const fileList = files
    .filter((file) => {
      // svgファイルに絞り込み
      return (
        fs.statSync(path.join(srcDir, file)).isFile() && fileRule.test(file)
      );
    })
    .map((file) => {
      // ファイル名から情報を取得
      const matched = file.match(groupedFileRule);
      if (matched.length == 0) throw new Error("ファイル名解析でエラーが発生");
      return [matched[1], matched[2], matched[3]];
    });

  // まとめる
  const icons = {};
  fileList.forEach((data) => {
    if (!(data[0] in icons)) {
      icons[data[0]] = {
        sizes: [],
        ext: data[2],
      };
    }
    icons[data[0]].sizes.push(data[1]);
  });

  return icons;
};

/**
 * targetDir下のアイコンコンポーネント情報をまとめる
 * @param {string} targetDir アイコンコンポーネントが存在するディレクトリ
 * @returns アイコン情報
 */
const getIconComponentInfo = async (targetDir) => {
  // public/iconsのファイル一覧取得
  const files = await new Promise((resolve, reject) => {
    fs.readdir(targetDir, (err, files) => {
      if (err) return reject(err);
      else return resolve(files);
    });
  });

  // index.ts以外のファイルを取得
  const fileList = files
    .filter((file) => {
      // svgファイルに絞り込み
      return (
        fs.statSync(path.join(targetDir, file)).isFile() &&
        /.*\.tsx$/.test(file) &&
        file != "index.ts"
      );
    })
    .map((file) => {
      // ファイル名をまとめる
      return path.parse(file).name;
    });

  return fileList;
};

/**
 * 全てのアイコンをコンポーネント化して一つずつtargetDirに保存する
 * @param {object} icons アイコン情報
 * @param {string} targetDir 保存ディレクトリ
 */
const createIconComponentsWithSaving = (icons, targetDir) => {
  // 全iconコードを生成
  Object.keys(icons).forEach((iconName) => {
    createAIconComponentWithSaving(
      icons,
      targetDir,
      iconName,
      (overwrite = false)
    );
  });
};

/**
 * 指定されたアイコンをコンポーネント化してtargetDirに保存
 * @param {object} icons アイコン情報
 * @param {string} targetDir 保存ディレクトリ
 * @param {string} iconName アイコン名
 */
const createAIconComponentWithSaving = (
  icons,
  targetDir,
  iconName,
  overwrite = false
) => {
  process.stdout.write(`${iconName}: `);

  // アイコンがアイコン情報内に存在するかチェック
  if (!(iconName in icons)) {
    process.stdout.write(`${iconName}というアイコンは見つかりませんでした。\n`);
    return;
  }

  const { sizes, ext } = icons[iconName];
  const fileName = `${iconName}.tsx`;
  const filePath = path.join(targetDir, fileName);

  // 既にファイルが存在したらスキップ
  if (!overwrite && fs.existsSync(filePath)) {
    process.stdout.write("ファイルが存在したためスキップ\n");
    return;
  }

  // コード生成・保存
  const code = createIconCode(iconName, sizes, ext);
  fs.writeFile(filePath, code, { flag: overwrite ? "w" : "wx" }, (err) => {
    if (err) throw err;
  });

  process.stdout.write(`${filePath}に出力\n`);
};

/**
 * アイコンインデックスコードを生成して保存する
 * @param {string[]} iconComponentFiles アイコンコンポーネントファイルリスト
 * @param {string} targetDir 保存ディレクトリ
 */
const createIconIndexWithSaving = (iconComponentFiles, targetDir) => {
  process.stdout.write(`インデックスファイル: `);

  const filePath = path.join(targetDir, "index.ts");

  // コード生成・保存
  const indexCode = createIconIndex(iconComponentFiles);
  fs.writeFile(filePath, indexCode, { flag: "w" }, (err) => {
    if (err) throw err;
  });

  process.stdout.write(`${filePath}に出力\n`);
};

/**
 * アイコンコンポーネントのコードを生成する
 * @param {string} iconName アイコンコンポーネント名
 * @param {number[]} sizes アイコンサイズリスト
 * @param {string} ext アイコンファイル拡張子
 * @returns アイコンコンポーネントのコード
 */
const createIconCode = (iconName, sizes, ext) => {
  const componentName = createIconComponentName(iconName);
  const code = `
    import React, { ComponentProps } from "react";
    import {
      IconPrototype,
      IconsDir,
    } from "./components/IconPrototype/IconPrototype";

    type Prop = {
      size?: ${sizes.join(" | ")};
    } & Omit<ComponentProps<typeof IconPrototype>, "filename" | "size">;

    const ${componentName}: React.FC<Prop> = ({
      size = ${sizes[0]},
      ...props
    }) => {
      return (
        <IconPrototype
          filename={\`\${IconsDir()}/${iconName}_\${size}.${ext}\`}
          size={\`\${size}px\`}
          {...props}
        />
      );
    };

    export default ${componentName};
  `;
  return prettier.format(code, prettierrc);
};

/**
 * アイコンのファイル名一覧からindexコードを生成
 * @param {string[]} iconFileNames アイコンファイル名リスト
 * @returns indexコード
 */
const createIconIndex = (iconFileNames) => {
  const code = iconFileNames
    .map((iconFileName) => {
      const exportName = createIconComponentName(iconFileName);
      return `export { default as ${exportName} } from "./${iconFileName}";`;
    })
    .join("\n");
  return prettier.format(code, prettierrc);
};

/**
 * パスカルケースでアイコンコンポーネント名を作成
 * @param {string} iconName アイコン名
 * @returns アイコンコンポーネント名
 */
const createIconComponentName = (iconName) => {
  // 先頭が数字の場合はIconを先頭に付ける
  const iconComponentName = /^\d/.test(iconName) ? `Icon${iconName}` : iconName;
  return pascalCase(iconComponentName);
};

/**
 * パスカルケースへ変換 SampleString
 * @param string
 * @return string
 */
const pascalCase = (str) => {
  str = str.charAt(0).toUpperCase() + str.slice(1);
  return str.replace(/[-_](.)/g, function (match, group1) {
    return group1.toUpperCase();
  });
};

//実行
main();
