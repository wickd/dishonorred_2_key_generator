let generated_path = './generated.json';
let generated = require(generated_path);
let jsonfile = require('jsonfile');

class Generator {

    constructor()
    {
        this.pattern = '*****-*****-*****';
        this.keys = [];
        this.generated_list = this.getGeneratedList(true);
    }

    testYourLucky(count = 1)
    {
        console.log('----- IT\'s your lucky day -----');

        for(let i = 0; i < count; i++)
        {
            this.keys[i] = this.generate();

            console.log(`${i}: ${this.keys[i]}`);
        }

        console.log('----- Fck the system, get Dishonorred 2 FREE -----');
    }

    generate()
    {
        let key = '';

        for(let i = 0; i < this.pattern.length; i++)
        {
            if(this.pattern[i] == '*')
            {
                let symbol = this.randomize();

                key += (typeof symbol == 'string') ? this.to_upper(symbol) : symbol; 
            } else {
                key += '-';
            }
        }

        if(! this.searchInGeneratedList(key))
        {
            // write to json.

            this.generated_list.push(key);

            // let parsedJSON = JSON.stringify(parsed);
            
            jsonfile.writeFileSync(generated_path, this.generated_list, {spaces: 4});

            return key;
        } else {
            // generate a new key.

            return this.generate();
        }
    }

    searchInGeneratedList(key)
    {
        let result = false;

        for (let i = 0; i < this.generated_list.length; i++)
        {
            if (this.generated_list[i] != key)
            {
                continue;
            } else {
                result = true;
            }
        }

        return result;
    }

    randomize()
    {
        // Full possible list
        // let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

        // Short List.
        let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

        return possible.charAt(Math.floor(Math.random() * possible.length));
    }

    to_upper(character)
    {
        return character.charAt(0).toUpperCase();
    }

    getGeneratedList(byJsonFile = false)
    {
        if(byJsonFile)
        {
            return jsonfile.readFileSync(generated_path, function(err, obj) {
                if(err)
                {
                    console.log('Cant read the file. Maybe it was removed or something else.');
                }
        
                return obj;
            });
        }

        return generated;
    }
} 

module.exports = Generator;