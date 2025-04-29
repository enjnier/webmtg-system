#!/bin/bash
set -e

# backendディレクトリの絶対パスを取得
BACKEND_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"

# 仮想環境の存在チェック
VENV_PATH="${BACKEND_DIR}/.venv"
if [ ! -d "$VENV_PATH" ]; then
    echo "エラー: 仮想環境が見つかりません。以下のコマンドを実行してください："
    echo "cd ${BACKEND_DIR} && uv venv"
    exit 1
fi

# activate スクリプトのパス
ACTIVATE_SCRIPT="${VENV_PATH}/bin/activate"

# activate スクリプトの存在チェック
if [ ! -f "$ACTIVATE_SCRIPT" ]; then
    echo "エラー: 仮想環境のactivateスクリプトが見つかりません。"
    exit 1
fi

# PYTHONPATH設定のコードを生成
cat << EOF > "${BACKEND_DIR}/pythonpath_setup.tmp"
# Python パスの設定（自動生成）
BACKEND_DIR="\$(dirname \$(dirname \$(dirname \$(realpath "\${BASH_SOURCE[0]}"))))"

# すでにPYTHONPATHに含まれていないか確認してから追加
add_to_python_path() {
    local path_to_add="\$1"
    if [[ ":\$PYTHONPATH:" != *":\$path_to_add:"* ]]; then
        if [ -z "\$PYTHONPATH" ]; then
            export PYTHONPATH="\$path_to_add"
        else
            export PYTHONPATH="\$PYTHONPATH:\$path_to_add"
        fi
    fi
}

# backendとbackend/srcをPYTHONPATHに追加
add_to_python_path "\$BACKEND_DIR"
add_to_python_path "\$BACKEND_DIR/src"

EOF

# 既存の設定を確認
if grep -q "# Python パスの設定（自動生成）" "$ACTIVATE_SCRIPT"; then
    # 既存の設定を削除
    sed -i '/# Python パスの設定（自動生成）/,/add_to_python_path.*backend\/src.*/d' "$ACTIVATE_SCRIPT"
    echo "既存のPYTHONPATH設定を更新します。"
fi

# 新しい設定を追加
cat "${BACKEND_DIR}/pythonpath_setup.tmp" >> "$ACTIVATE_SCRIPT"
echo "PYTHONPATHの設定を仮想環境のactivateスクリプトに追加しました。"

# 一時ファイルを削除
rm "${BACKEND_DIR}/pythonpath_setup.tmp"

echo "セットアップが完了しました。以下のコマンドで仮想環境をアクティベートすることができます。"
echo "source ${VENV_PATH}/bin/activate"

