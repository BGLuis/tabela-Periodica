from flask import Flask, jsonify, json, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app, origins=["*"])


def get_json():
    with open("api/elementos.json", "r",encoding='utf-8') as arquivo_json:
        dados = json.load(arquivo_json) 
    return dados


def put_json(elemento,indice):
    tabela = get_json()
    tabela[indice].update(elemento)
    with open("api/elementos.json", "w", encoding='utf-8') as arquivo_json:
        json.dump(tabela, arquivo_json, indent=4)
    return tabela[indice]


@app.route('/tabela',methods=['GET'])
def Obter_tabela():
    # return jsonify(elementos)
    return get_json()


@app.route('/elementos/numero/<int:id>',methods=['GET'])
def obter_elemento_id(id):
    for elemento in get_json():
        if elemento.get('numero') == id:
            return jsonify(elemento)


@app.route('/elementos/simbolo/<string:simbolo>',methods=['GET'])
def obter_elemento_simbolo(simbolo):
    for elemento in get_json():
        if elemento.get('simbolo') == simbolo:
            return jsonify(elemento)


@app.route('/elementos/<int:id>',methods=['PUT'])
def editar_elemento(id):
    elemento_edit = request.get_json()
    elementos = get_json()
    for indice,elemento in enumerate(elementos):
        if elemento.get('numero') == id:
            return jsonify(put_json(elemento_edit,indice))
        

app.run(port=5000,host='localhost',debug=True)