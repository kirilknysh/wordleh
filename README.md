# wordleh
[Wordle](https://www.powerlanguage.co.uk/wordle/) helper.

## Usage
The easiest is to use `npm exec` command:
```sh
npm exec github:kirilknysh/wordleh -- -h
```

If the previous version is already installed, clean cache with:
```sh
npm exec clear-npx-cache
```

## Real life example
1. Get initial word with length 5:
```sh
> npm exec github:kirilknysh/wordleh 5

Use one of these words:
  aeros , arose , soare
```

2. Enter `arose` -> ⬛️🟨⬛️🟨🟩:
- letters `a` (position 0) and `o` (position 2) should be completely excluded;
- letters `r` (position 1) and `s` (position 3) exist in the final word but their current positions are wrong;
- letter `e` (position 4) is correct;

3. Use information from step 2 for the next script run:
```sh
> npm exec github:kirilknysh/wordleh 5 a! r1! o! s3! e4

Use one of these words:
  sprue
```

where:

`a!` - letter `a` is not in the final word;

`r1!` - letter `r` exists in the final word but at the position `1`;

`e4` - letter `e` exists in the final word at the position `4`;

4. Enter `sprue` -> 🟩⬛️🟨⬛️🟩:
- letters `s` (position 0) and `e` (position 4) are correct;
- letters `p` (position 1) and `u` (position 3) should be completely excluded;
- letter `r` (position 2) is still wrong;

5. Use information from step 4 to extend the command:
```sh
> npm exec github:kirilknysh/wordleh 5 a! r1! o! s3! e4 s0 p! r2! u!

Use one of these words:
  stire
```

6. Enter `stire` -> 🟩⬛️🟩🟩🟩:
- letters `s` (position 0), `i` (position 2), `r` (position 3), `e` (position 4) are correct;
- letter `t` (position 1) should be completely excluded;

7. Use information from step 6 to extend the command:
```sh
> npm exec github:kirilknysh/wordleh 5 a! r1! o! s3! e4 s0 p! r2! u! t! i2 r3

Use one of these words:
  shire
```

8. Enter `shire` -> 🟩🟩🟩🟩🟩

## Results
<table>
  <tr valign="top">
    <td>
      <pre>
Wordle 212 4/6
⬛️🟨⬛️🟨🟩
🟩⬛️🟨⬛️🟩
🟩⬛️🟩🟩🟩
🟩🟩🟩🟩🟩
      </pre>
    </td>
    <td>
      <pre>
Wordle 213 6/6
⬛️🟩🟩⬛️⬛️
⬛️🟩🟩⬛️⬛️
⬛️🟩🟩⬛️⬛️
⬛️🟩🟩⬛️⬛️
⬛️🟩🟩⬛️🟩
🟩🟩🟩🟩🟩
      </pre>
    </td>
    <td>
      <pre>
Wordle 214 4/6
⬛️⬛️🟨⬛️⬛️
🟨🟩🟨🟨⬛️
⬛️🟩🟩🟩🟩
🟩🟩🟩🟩🟩
      </pre>
    </td>
    <td>
      <pre>
Wordle 215 3/6
⬛️🟨🟨⬛️⬛️
⬛️🟩⬛️🟨🟩
🟩🟩🟩🟩🟩
      </pre>
    </td>
  </tr>
  <tr valign="top">
    <td>
      <pre>
Wordle 216 4/6
⬛️🟩⬛️⬛️⬛️
⬛️🟩⬛️🟨⬛️
🟩🟩🟩⬛️⬛️
🟩🟩🟩🟩🟩
      </pre>
    </td>
    <td>
      <pre>
Wordle 217 4/6
⬛️⬛️⬛️⬛️🟩
⬛️🟩⬛️🟨🟩
⬛️🟩🟩🟩🟩
🟩🟩🟩🟩🟩
      </pre>
    </td>
    <td>
      <pre>
Wordle 218 4/6
⬛️🟩⬛️⬛️⬛️
⬛️🟩⬛️🟨⬛️
🟨🟩🟩⬛️⬛️
🟩🟩🟩🟩🟩
      </pre>
    </td>
    <td>
      <pre>
Wordle 219 3/6
⬛️⬛️🟩⬛️⬛️
⬛️⬛️🟩🟩⬛️
🟩🟩🟩🟩🟩
      </pre>
    </td>
  </tr>
  <tr valign="top">
    <td>
      <pre>
Wordle 220 3/6
🟨🟨⬛🟨⬛
🟩⬛🟨⬛🟩
🟩🟩🟩🟩🟩
      </pre>
    </td>
    <td>
      <pre>
Wordle 221 5/6
🟨⬛⬛⬛⬛
⬛⬛⬛🟨⬛
⬛⬛⬛🟨🟨
🟨🟩🟩🟨🟩
🟩🟩🟩🟩🟩
      </pre>
    </td>
    <td>
      <pre>
Wordle 222 3/6
⬛⬛🟨⬛⬛
🟨🟩🟨⬛⬛
🟩🟩🟩🟩🟩
      </pre>
    </td>
    <td>
      <pre>
Wordle 223 3/6
⬛🟨⬛⬛🟨
⬛⬛🟩🟨⬛
🟩🟩🟩🟩🟩
      </pre>
    </td>
  </tr>
  <tr valign="top">
    <td>
      <pre>
Wordle 224 4/6
⬛⬛🟨⬛⬛
⬛🟩⬛⬛🟨
⬛🟩🟨⬛⬛
🟩🟩🟩🟩🟩
      </pre>
    </td>
    <td>
      <pre>
Wordle 225 4/6
⬛🟩⬛⬛⬛
⬛🟩🟩⬛⬛
⬛🟩🟩🟩⬛
🟩🟩🟩🟩🟩
      </pre>
    </td>
    <td>
      <pre>
Wordle 226 5/6
⬛⬛⬛⬛⬛
⬛⬛🟨🟨⬛
⬛🟩🟨⬛🟨
⬛🟩🟩🟩🟩
🟩🟩🟩🟩🟩
      </pre>
    </td>
    <td>
      <pre>
Wordle 227 4/6
⬛⬛🟩🟩🟩
⬛⬛🟩🟩🟩
⬛⬛🟩🟩🟩
🟩🟩🟩🟩🟩
      </pre>
    </td>
  </tr>
  <tr valign="top">
    <td>
      <pre>
Wordle 228 4/6
⬛⬛🟨🟩⬛
🟨🟩⬛🟩⬛
⬛🟩🟩🟩🟩
🟩🟩🟩🟩🟩
      </pre>
    </td>
    <td>
      <pre>
Wordle 229 5/6
🟨🟨⬛🟨⬛
🟩⬛🟩⬛🟨
🟩⬛🟩🟩⬛
🟩⬛🟩🟩⬛
🟩🟩🟩🟩🟩
      </pre>
    </td>
    <td>
      <pre>
Wordle 230 5/6
🟨⬛⬛⬛🟨
⬛🟨🟨🟨🟨
🟨🟨⬛🟨🟩
🟨⬛🟨🟨🟩
🟩🟩🟩🟩🟩
      </pre>
    </td>
    <td>
      <pre>
Wordle 231 5/6
🟩⬛🟩⬛⬛
🟩⬛🟩⬛🟩
🟩⬛🟩⬛🟩
🟩🟨🟩⬛🟩
🟩🟩🟩🟩🟩
      </pre>
    </td>
  </tr>
  <tr valign="top">
    <td>
      <pre>
Wordle 232 4/6
⬛⬛⬛🟨⬛
🟩🟨⬛🟨⬛
🟩🟨🟨🟨⬛
🟩🟩🟩🟩🟩
      </pre>
    </td>
    <td>
      <pre>
Wordle 233 5/6
⬛🟨⬛⬛🟨
⬛⬛🟨🟩🟨
🟨🟨⬛🟩🟩
⬛⬛🟩🟩🟩
🟩🟩🟩🟩🟩
      </pre>
    </td>
    <td>
      <pre>
Wordle 234 4/6
🟨🟩⬛⬛🟩
⬛🟩🟩⬛🟩
⬛🟩🟩🟩🟩
🟩🟩🟩🟩🟩
      </pre>
    </td>
    <td>
      <pre>
Wordle 235 3/6
⬛🟨🟨⬛⬛
⬛🟨🟨🟨⬛
🟩🟩🟩🟩🟩
      </pre>
    </td>
  </tr>
  <tr valign="top">
    <td>
      <pre>
Wordle 236 3/6
🟨⬛⬛🟩🟩
⬛🟩🟩🟩🟩
🟩🟩🟩🟩🟩
      </pre>
    </td>
    <td>
      <pre>
Wordle 237 4/6
⬛🟨⬛⬛🟨
⬛⬛🟨🟩⬛
⬛🟨🟨🟩🟩
🟩🟩🟩🟩🟩
      </pre>
    </td>
    <td>
      <pre>
Wordle 238 3/6
🟨🟨⬛⬛⬛
🟨🟨⬛🟩⬛
🟩🟩🟩🟩🟩
      </pre>
    </td>
    <td>
      <pre>
Wordle 239 5/6
⬛🟨🟨⬛⬛
⬛🟩⬛🟨⬛
⬛🟩🟨⬛⬛
⬛🟩🟨⬛🟨
🟩🟩🟩🟩🟩
      </pre>
    </td>
  </tr>
  <tr valign="top">
    <td>
      <pre>
Wordle 240 4/6*
⬛⬛⬛⬛⬛
⬛🟨🟨⬛🟨
⬛🟨🟩🟨⬛
🟩🟩🟩🟩🟩
      </pre>
    </td>
    <td>
      <pre>
Wordle 241 2/6*
🟩🟩🟩⬛⬛
🟩🟩🟩🟩🟩
      </pre>
    </td>
    <td>
      <pre>
Wordle 242 5/6*
🟨⬛⬛⬛⬛
⬛⬛🟨🟨⬛
🟩🟨🟨🟨⬛
🟩🟩🟩🟩⬛
🟩🟩🟩🟩🟩
      </pre>
    </td>
    <td>
      <pre>
Wordle 243
      </pre>
    </td>
  </tr>
</table>
